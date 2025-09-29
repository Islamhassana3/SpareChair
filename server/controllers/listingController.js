const prisma = require('../config/database');

const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      businessType,
      spaceType,
      address,
      city,
      state,
      zipCode,
      pricePerHour,
      pricePerDay,
      amenities
    } = req.body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        businessType,
        spaceType,
        address,
        city,
        state,
        zipCode,
        pricePerHour: parseFloat(pricePerHour),
        pricePerDay: pricePerDay ? parseFloat(pricePerDay) : null,
        amenities: amenities || [],
        images: [], // Will be updated when images are uploaded
        hostId: req.user.id
      },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            businessName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getListings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      businessType,
      spaceType,
      minPrice,
      maxPrice,
      search
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      isActive: true,
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(businessType && { businessType }),
      ...(spaceType && { spaceType }),
      ...(minPrice && { pricePerHour: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { pricePerHour: { lte: parseFloat(maxPrice) } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take,
        include: {
          host: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              businessName: true,
              avatar: true
            }
          },
          reviews: {
            select: {
              rating: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.listing.count({ where })
    ]);

    // Calculate average rating for each listing
    const listingsWithRating = listings.map(listing => ({
      ...listing,
      averageRating: listing.reviews.length > 0 
        ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length 
        : 0,
      reviewCount: listing.reviews.length
    }));

    res.json({
      listings: listingsWithRating,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            businessName: true,
            businessType: true,
            avatar: true,
            createdAt: true
          }
        },
        reviews: {
          include: {
            guest: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        availability: {
          where: {
            date: { gte: new Date() }
          },
          orderBy: { date: 'asc' }
        }
      }
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Calculate average rating
    const averageRating = listing.reviews.length > 0 
      ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length 
      : 0;

    res.json({
      ...listing,
      averageRating,
      reviewCount: listing.reviews.length
    });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if listing exists and belongs to user
    const existingListing = await prisma.listing.findUnique({
      where: { id }
    });

    if (!existingListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existingListing.hostId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this listing' });
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: req.body,
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            businessName: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if listing exists and belongs to user
    const existingListing = await prisma.listing.findUnique({
      where: { id }
    });

    if (!existingListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existingListing.hostId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this listing' });
    }

    await prisma.listing.delete({
      where: { id }
    });

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMyListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { hostId: req.user.id },
      include: {
        reviews: {
          select: {
            rating: true
          }
        },
        bookings: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const listingsWithStats = listings.map(listing => ({
      ...listing,
      averageRating: listing.reviews.length > 0 
        ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length 
        : 0,
      reviewCount: listing.reviews.length,
      bookingCount: listing.bookings.length,
      activeBookings: listing.bookings.filter(b => b.status === 'CONFIRMED').length
    }));

    res.json({ listings: listingsWithStats });
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  getMyListings
};