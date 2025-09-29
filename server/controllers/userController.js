const prisma = require('../config/database');

const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      businessName,
      businessType,
      businessAddress
    } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        phone,
        businessName,
        businessType,
        businessAddress
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        userType: true,
        businessName: true,
        businessType: true,
        businessAddress: true,
        isVerified: true,
        createdAt: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.userType === 'HOST') {
      const [listingCount, bookingCount, totalEarnings, reviewCount] = await Promise.all([
        prisma.listing.count({ where: { hostId: userId } }),
        prisma.booking.count({ 
          where: { 
            listing: { hostId: userId },
            status: 'COMPLETED'
          } 
        }),
        prisma.booking.aggregate({
          where: { 
            listing: { hostId: userId },
            status: 'COMPLETED'
          },
          _sum: { totalAmount: true }
        }),
        prisma.review.count({ where: { hostId: userId } })
      ]);

      res.json({
        stats: {
          listingCount,
          bookingCount,
          totalEarnings: totalEarnings._sum.totalAmount || 0,
          reviewCount
        }
      });
    } else {
      const [bookingCount, totalSpent, reviewCount] = await Promise.all([
        prisma.booking.count({ 
          where: { 
            guestId: userId,
            status: 'COMPLETED'
          } 
        }),
        prisma.booking.aggregate({
          where: { 
            guestId: userId,
            status: 'COMPLETED'
          },
          _sum: { totalAmount: true }
        }),
        prisma.review.count({ where: { guestId: userId } })
      ]);

      res.json({
        stats: {
          bookingCount,
          totalSpent: totalSpent._sum.totalAmount || 0,
          reviewCount
        }
      });
    }
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  updateProfile,
  getUserStats
};