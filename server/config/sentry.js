const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

const initSentry = (app) => {
  // Only initialize Sentry in production or if DSN is provided
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      integrations: [
        // Enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // Enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        // Enable profiling
        new ProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1, // 10% of transactions
      // Profiling
      profilesSampleRate: process.env.SENTRY_PROFILES_SAMPLE_RATE || 0.1, // 10% of transactions
    });

    console.log('✅ Sentry initialized for error tracking');
  } else {
    console.log('ℹ️ Sentry not initialized (requires production environment and SENTRY_DSN)');
  }
};

module.exports = { Sentry, initSentry };
