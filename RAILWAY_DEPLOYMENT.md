# Railway.app Deployment Guide for ChairShare

## Overview
This guide contains optimizations and configurations specific for deploying ChairShare on Railway.app.

## Railway Configuration Files

### 1. railway.toml
Configures Railway-specific build and deployment settings.

### 2. nixpacks.toml
Configures the Nixpacks builder used by Railway.

### 3. Procfile
Specifies the process to run the application.

## Environment Variables Required

Set these environment variables in your Railway project:

```bash
# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret (Generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key

# Email (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-app-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# App Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
CLIENT_URL=https://your-app-name.up.railway.app
```

## Deployment Steps

1. **Connect Your Repository**
   - Go to Railway dashboard
   - Create new project
   - Connect your GitHub repository

2. **Add PostgreSQL Database**
   - Add PostgreSQL service to your Railway project
   - Railway will automatically set DATABASE_URL

3. **Set Environment Variables**
   - Add all required environment variables listed above
   - Use Railway's environment variable interface

4. **Deploy**
   - Railway will automatically build and deploy your application
   - The build process includes:
     - Installing dependencies
     - Building React frontend
     - Generating Prisma client
     - Running database migrations

## Production Optimizations Included

### Performance
- Optimized build process with separated frontend/backend builds
- Efficient static file serving for React app
- Database connection pooling with Prisma

### Monitoring
- Enhanced health check endpoint (`/api/health`)
- Database connectivity monitoring
- Environment status reporting

### File Upload Considerations
⚠️ **Important**: Railway has ephemeral filesystem. Current implementation serves uploads from local `/uploads` directory.

**Recommendations for production:**
1. **Use Railway's Volume (Recommended)**: Mount persistent volume for uploads
2. **Use Cloud Storage**: Integrate with AWS S3, Cloudinary, or similar service
3. **Update Upload Routes**: Modify file upload handling in production

### Security
- Proper CORS configuration for production
- Environment-based configuration
- Secure database connections

## Health Check
Access the health check endpoint at: `https://your-app.railway.app/api/health`

Returns:
- Application status
- Database connectivity
- Environment information
- Timestamp

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check that all dependencies are properly listed in package.json
   - Verify TypeScript compilation passes locally

2. **Database Connection Issues**
   - Ensure DATABASE_URL is set correctly
   - Check PostgreSQL service is running

3. **Environment Variable Issues**
   - Verify all required variables are set in Railway dashboard
   - Check variable names match exactly

4. **File Upload Issues**
   - Current implementation uses local filesystem
   - Consider implementing cloud storage for production

## Performance Tips

1. **Database**
   - Use connection pooling (Prisma handles this)
   - Consider read replicas for high traffic

2. **Static Files**
   - React build is optimized and gzipped
   - Consider CDN for static assets

3. **Monitoring**
   - Use Railway's built-in monitoring
   - Monitor `/api/health` endpoint
   - Set up alerts for application errors

## Cost Optimization

1. **Use Railway's sleep feature** for development environments
2. **Monitor resource usage** in Railway dashboard
3. **Optimize database queries** to reduce compute time
4. **Use Railway's built-in metrics** to track performance