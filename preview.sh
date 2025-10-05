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

# Function to find an available port starting from a given port
find_available_port() {
    local port=$1
    local max_port=$((port + 100))  # Try up to 100 ports
    
    while [ $port -le $max_port ]; do
        if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo $port
            return 0
        fi
        port=$((port + 1))
    done
    
    echo ""
    return 1
}

# Find an available port starting from 3000
echo "🔍 Searching for an available port..."
PORT=$(find_available_port 3000)

if [ -z "$PORT" ]; then
    echo -e "${YELLOW}⚠️  Could not find an available port between 3000-3100${NC}"
    echo "Please free some ports and try again."
    exit 1
fi

if [ "$PORT" != "3000" ]; then
    echo -e "${YELLOW}⚠️  Port 3000 is in use, using port $PORT instead${NC}"
else
    echo -e "${GREEN}✓${NC} Port 3000 is available"
fi
echo ""

# Export PORT for npm start
export PORT

echo -e "${BLUE}🌐 Starting ChairShare preview on http://localhost:$PORT${NC}"
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
    local port=$1
    local url="http://localhost:$port"
    
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
open_browser $PORT &

# Start the development server
npm start
