# ChairShare Preview Script for Windows (PowerShell)
# This script automatically sets up and launches the ChairShare preview

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ChairShare Preview Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# Check if Node.js is installed
if (-not (Test-CommandExists "node")) {
    Write-Host "[WARNING] Node.js is not installed. Please install Node.js 18 or higher." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
if (-not (Test-CommandExists "npm")) {
    Write-Host "[WARNING] npm is not installed. Please install npm 9 or higher." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Node.js and npm found" -ForegroundColor Green
Write-Host ""

# Check if node_modules exists in root
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing root dependencies..." -ForegroundColor Blue
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install root dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
}

# Navigate to client directory
if (-not (Test-Path "client")) {
    Write-Host "[ERROR] Client directory not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location client

# Check if node_modules exists in client
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing frontend dependencies..." -ForegroundColor Blue
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
}

Write-Host "[OK] All dependencies are ready" -ForegroundColor Green
Write-Host ""

# Function to find an available port
function Find-AvailablePort {
    param($startPort)
    
    $maxPort = $startPort + 100
    
    for ($port = $startPort; $port -le $maxPort; $port++) {
        $portInUse = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
        if (-not $portInUse) {
            return $port
        }
    }
    
    return $null
}

# Find an available port starting from 3000
Write-Host "[INFO] Searching for an available port..." -ForegroundColor Blue
$PORT = Find-AvailablePort -startPort 3000

if ($null -eq $PORT) {
    Write-Host "[ERROR] Could not find an available port between 3000-3100" -ForegroundColor Red
    Write-Host "Please free some ports and try again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

if ($PORT -ne 3000) {
    Write-Host "[WARNING] Port 3000 is in use, using port $PORT instead" -ForegroundColor Yellow
} else {
    Write-Host "[OK] Port 3000 is available" -ForegroundColor Green
}
Write-Host ""

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Starting ChairShare preview" -ForegroundColor Cyan
Write-Host "   http://localhost:$PORT" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   The application will open in your browser shortly..." -ForegroundColor Yellow
Write-Host "   Press Ctrl+C to stop the preview server" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Wait a moment before starting
Start-Sleep -Seconds 2

# Start browser in background after a delay
$job = Start-Job -ScriptBlock {
    param($port)
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:$port"
} -ArgumentList $PORT

# Set PORT environment variable for npm start
$env:PORT = $PORT

# Start the development server
npm start
