#!/bin/bash

# ChairShare Preview Script for Linux/macOS
# This script automatically sets up and launches the ChairShare preview

set -e

echo "🚀 ChairShare Preview Launcher"
echo "================================"
echo ""

# Color codes for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 18 or higher.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm is not installed. Please install npm 9 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js and npm found"
echo ""

# Check if node_modules exists in root
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing root dependencies...${NC}"
    npm install
    echo ""
fi

# Navigate to client directory
cd client

# Check if node_modules exists in client
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
    npm install
    echo ""
fi

echo -e "${GREEN}✓${NC} All dependencies are ready"
echo ""

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use${NC}"
    echo "Would you like to kill the existing process? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Killing process on port 3000..."
        lsof -ti:3000 | xargs kill -9 2>/dev/null || true
        echo -e "${GREEN}✓${NC} Port 3000 is now free"
        echo ""
    else
        echo "Please free port 3000 and try again."
        exit 1
    fi
fi

echo -e "${BLUE}🌐 Starting ChairShare preview on http://localhost:3000${NC}"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}   The application will open in your browser shortly...${NC}"
echo -e "${GREEN}   Press Ctrl+C to stop the preview server${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Give the terminal a moment to display the message
sleep 2

# Open browser based on OS
open_browser() {
    local url="http://localhost:3000"
    
    # Wait for the server to start
    echo "⏳ Waiting for server to start..."
    sleep 5
    
    # Detect OS and open browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url" 2>/dev/null || true
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open "$url" 2>/dev/null || true
        elif command -v gnome-open &> /dev/null; then
            gnome-open "$url" 2>/dev/null || true
        fi
    fi
    
    echo -e "${GREEN}✓${NC} Browser launched!"
}

# Start browser opener in background
open_browser &

# Start the development server
npm start
