#!/bin/bash

# ChairShare Development Setup Script

echo "🚀 Setting up ChairShare development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if PostgreSQL is running (optional check)
if command -v pg_isready &> /dev/null; then
    if ! pg_isready -q; then
        echo "⚠️  PostgreSQL is not running. Please start PostgreSQL or update DATABASE_URL in .env"
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd client && npm install && cd ..

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual configuration values"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your database and API keys"
echo "2. Run 'npx prisma db push' to create database tables"
echo "3. Run 'npm run dev' to start the development servers"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"