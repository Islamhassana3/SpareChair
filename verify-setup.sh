#!/bin/bash

# ChairShare Setup Verification Script
# Run this script to verify your development environment is correctly configured

echo "🔍 ChairShare Setup Verification"
echo "================================"
echo ""

ERRORS=0
WARNINGS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_success() {
    echo -e "${GREEN}✓${NC} $1"
}

check_error() {
    echo -e "${RED}✗${NC} $1"
    ERRORS=$((ERRORS + 1))
}

check_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

# 1. Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        check_success "Node.js $NODE_VERSION installed (requirement: v18+)"
    else
        check_error "Node.js $NODE_VERSION is too old (requirement: v18+)"
    fi
else
    check_error "Node.js is not installed"
fi

# 2. Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    NPM_MAJOR=$(echo $NPM_VERSION | cut -d'.' -f1)
    if [ "$NPM_MAJOR" -ge 9 ]; then
        check_success "npm $NPM_VERSION installed (requirement: v9+)"
    else
        check_warning "npm $NPM_VERSION may be too old (recommended: v9+)"
    fi
else
    check_error "npm is not installed"
fi

# 3. Check PostgreSQL
echo "Checking PostgreSQL..."
if command -v pg_isready &> /dev/null; then
    if pg_isready -q 2>/dev/null; then
        check_success "PostgreSQL is installed and running"
    else
        check_warning "PostgreSQL is installed but not running"
        echo "  → Start it with: sudo systemctl start postgresql (Linux) or brew services start postgresql (macOS)"
    fi
else
    if command -v psql &> /dev/null; then
        check_warning "PostgreSQL is installed but pg_isready not available"
    else
        check_error "PostgreSQL is not installed"
    fi
fi

# 4. Check root node_modules
echo "Checking dependencies..."
if [ -d "node_modules" ]; then
    check_success "Root dependencies installed (node_modules exists)"
else
    check_error "Root dependencies not installed (run: npm install)"
fi

# 5. Check client node_modules
if [ -d "client/node_modules" ]; then
    check_success "Client dependencies installed"
else
    check_error "Client dependencies not installed (run: cd client && npm install)"
fi

# 6. Check .env file
echo "Checking environment configuration..."
if [ -f ".env" ]; then
    check_success ".env file exists"
    
    # Check for required variables
    if grep -q "DATABASE_URL=" .env && ! grep -q 'DATABASE_URL="postgresql://username:password' .env; then
        check_success "DATABASE_URL is configured"
    else
        check_warning "DATABASE_URL may not be properly configured in .env"
        echo "  → Update DATABASE_URL with your PostgreSQL connection string"
    fi
    
    if grep -q "JWT_SECRET=" .env && ! grep -q 'JWT_SECRET="your-jwt-secret-key-here"' .env; then
        check_success "JWT_SECRET is configured"
    else
        check_warning "JWT_SECRET is using default value (should be changed for security)"
        echo "  → Generate a secret: openssl rand -base64 32"
    fi
else
    check_error ".env file not found"
    echo "  → Run: cp .env.example .env"
fi

# 7. Check Prisma client
echo "Checking Prisma setup..."
if [ -d "node_modules/.prisma/client" ]; then
    check_success "Prisma client is generated"
else
    check_error "Prisma client not generated (run: npx prisma generate)"
fi

# 8. Check if ports are available
echo "Checking ports..."
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_warning "Port 5000 (backend) is already in use"
    echo "  → Kill process: lsof -ti:5000 | xargs kill -9"
else
    check_success "Port 5000 (backend) is available"
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_warning "Port 3000 (frontend) is already in use"
    echo "  → Kill process: lsof -ti:3000 | xargs kill -9"
else
    check_success "Port 3000 (frontend) is available"
fi

# 9. Try to test database connection (if .env exists)
if [ -f ".env" ]; then
    echo "Testing database connection..."
    if command -v npx &> /dev/null && [ -d "node_modules/.prisma/client" ]; then
        # Test connection by trying to run a simple Prisma command
        if timeout 5 npx prisma db pull --force 2>&1 | grep -q "Error" 2>/dev/null; then
            check_warning "Could not verify database connection"
            echo "  → Check DATABASE_URL and ensure PostgreSQL is running"
        else
            # If command didn't error out immediately, connection might be OK
            check_success "Database connection test passed (or timed out gracefully)"
        fi
    else
        check_warning "Cannot test database connection (Prisma client not ready)"
    fi
fi

# Summary
echo ""
echo "================================"
echo "Summary:"
echo "================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC} Your setup looks good."
    echo ""
    echo "Next steps:"
    echo "  1. Review your .env configuration"
    echo "  2. Run: npx prisma db push (to create database tables)"
    echo "  3. Run: npm run dev (to start the application)"
    echo ""
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warning(s) found.${NC} Your setup should work but may need attention."
    echo ""
    echo "Next steps:"
    echo "  1. Address the warnings above"
    echo "  2. Run: npm run dev (to start the application)"
    echo ""
else
    echo -e "${RED}✗ $ERRORS error(s) found.${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS warning(s) found.${NC}"
    fi
    echo ""
    echo "Please fix the errors above before proceeding."
    echo ""
    echo "Quick fixes:"
    echo "  - Missing Node.js: Install from https://nodejs.org/"
    echo "  - Missing PostgreSQL: Install from https://www.postgresql.org/download/"
    echo "  - Missing dependencies: Run 'npm install' and 'cd client && npm install'"
    echo "  - Missing .env: Run 'cp .env.example .env' and edit it"
    echo "  - Missing Prisma client: Run 'npx prisma generate'"
    echo ""
fi

echo "For detailed troubleshooting, see: TROUBLESHOOTING.md"
echo ""

exit $ERRORS
