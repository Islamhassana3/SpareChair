const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { Sentry, initSentry } = require('./config/sentry');
const logger = require('./config/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { limiter, authLimiter } = require('./middleware/rateLimiter');
const { performanceLogger } = require('./middleware/performanceLogger');
const { auditLogger } = require('./middleware/auditLogger');
const { requestIdMiddleware } = require('./middleware/requestId');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Initialize Sentry - must be first
initSentry(app);

// Sentry request handler - must be before all other handlers
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// Add unique request ID to each request
app.use(requestIdMiddleware);

// Performance logging middleware
app.use(performanceLogger(1000)); // Log requests taking more than 1 second

// Security audit logging
app.use(auditLogger);

// Trust proxy for Railway
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
}

// Security middleware - Helmet.js
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? [process.env.CLIENT_URL, /\.railway\.app$/] : true,
    credentials: true,
  })
);

// Request logging
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', limiter);

// Rate limiting
app.use('/api/', limiter);

// Trust proxy for Railway
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
}

// Serve uploaded files
// Note: For Railway deployment, consider using cloud storage (S3, Cloudinary)
// instead of local filesystem due to ephemeral nature
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authLimiter, authRoutes);
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
      port: PORT,
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
        logger.warn('Database health check failed', { error: dbError.message });
      }
    }

    logger.info('Health check performed', { status: health.status });
    res.json(health);
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
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

// Sentry error handler - must be before custom error handlers
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Error handling middleware - must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, HOST, () => {
    logger.info(`ChairShare server running on ${HOST}:${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV}`);
    logger.info(`Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
  });
}

module.exports = app;
