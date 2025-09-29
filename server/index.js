const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.CLIENT_URL, /\.railway\.app$/]
    : true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy for Railway
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
}

// Serve uploaded files
// Note: For Railway deployment, consider using cloud storage (S3, Cloudinary) 
// instead of local filesystem due to ephemeral nature
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Basic health check
    const health = {
      status: 'OK',
      message: 'ChairShare API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      port: PORT
    };

    // Check database connectivity if in production
    if (process.env.NODE_ENV === 'production') {
      try {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        await prisma.$queryRaw`SELECT 1`;
        health.database = 'Connected';
        await prisma.$disconnect();
      } catch (dbError) {
        health.database = 'Disconnected';
        health.status = 'WARNING';
      }
    }

    res.json(health);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message
    });
  }
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`ChairShare server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
});

module.exports = app;