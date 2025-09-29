#!/bin/bash

# Railway Startup Script for ChairShare
echo "🚀 Starting ChairShare deployment on Railway..."

# Check if this is a Railway environment
if [ "$RAILWAY_ENVIRONMENT" ]; then
    echo "📡 Railway environment detected: $RAILWAY_ENVIRONMENT"
    
    # Ensure Prisma client is generated
    echo "🔄 Generating Prisma client..."
    npx prisma generate
    
    # Run database migrations/push
    echo "🗄️  Setting up database..."
    npx prisma db push --accept-data-loss
    
    echo "✅ Database setup complete"
else
    echo "🏠 Local development environment"
fi

# Start the application
echo "🎯 Starting ChairShare server..."
exec npm start