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

# Check if port 3000 is already in use
$port3000InUse = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($port3000InUse) {
    Write-Host "[WARNING] Port 3000 is already in use" -ForegroundColor Yellow
    $response = Read-Host "Would you like to kill the existing process? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "Killing process on port 3000..." -ForegroundColor Blue
        $processIds = $port3000InUse | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($pid in $processIds) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
        Write-Host "[OK] Port 3000 is now free" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "Please free port 3000 and try again." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Starting ChairShare preview" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor Green
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
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:3000"
}

# Start the development server
npm start
