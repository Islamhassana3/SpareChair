const prisma = require('../config/database');

const createBooking = async (req, res) => {
  try {
    const {
      listingId,
      startDate,
      endDate,
      startTime,
      endTime,
      message
    } = req.body;

    // Check if listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Calculate total hours and amount
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const totalHours = Math.ceil((end - start) / (1000 * 60 * 60));
    const totalAmount = totalHours * listing.pricePerHour;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        guestId: req.user.id,
        listingId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        totalHours,
        totalAmount,
        message: message || null
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            address: true,
            city: true,
            pricePerHour: true
          }
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBookings = async (req, res) => {
  try {
    const { status, type = 'guest' } = req.query;

    const where = {
      ...(type === 'guest' ? { guestId: req.user.id } : {}),
      ...(type === 'host' ? { listing: { hostId: req.user.id } } : {}),
      ...(status && { status })
    };

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            address: true,
            city: true,
            images: true,
            pricePerHour: true,
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                businessName: true
              }
            }
          }
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        listing: {
          include: {
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                businessName: true,
                email: true,
                phone: true
              }
            }
          }
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        payment: true,
        review: true
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user has access to this booking
    const isGuest = booking.guestId === req.user.id;
    const isHost = booking.listing.hostId === req.user.id;
    const isAdmin = req.user.userType === 'ADMIN';

    if (!isGuest && !isHost && !isAdmin) {
      return res.status(403).json({ error: 'Not authorized to view this booking' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: {
        listing: true
      }
    });

    if (!existingBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only host or admin can update booking status
    if (existingBooking.listing.hostId !== req.user.id && req.user.userType !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to update this booking' });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            address: true,
            city: true
          }
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id }
    });

    if (!existingBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only guest can cancel their own booking
    if (existingBooking.guestId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    // Can only cancel pending or confirmed bookings
    if (!['PENDING', 'CONFIRMED'].includes(existingBooking.status)) {
      return res.status(400).json({ error: 'Cannot cancel this booking' });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            address: true,
            city: true
          }
        }
      }
    });

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking
};