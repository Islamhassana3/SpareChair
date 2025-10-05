@echo off
REM ChairShare Preview Script for Windows (Command Prompt)
REM This script automatically sets up and launches the ChairShare preview

setlocal enabledelayedexpansion

echo.
echo ========================================
echo    ChairShare Preview Launcher
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] npm is not installed. Please install npm 9 or higher.
    pause
    exit /b 1
)

echo [OK] Node.js and npm found
echo.

REM Check if node_modules exists in root
if not exist "node_modules\" (
    echo [INFO] Installing root dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install root dependencies
        pause
        exit /b 1
    )
    echo.
)

REM Navigate to client directory
cd client
if %errorlevel% neq 0 (
    echo [ERROR] Client directory not found
    pause
    exit /b 1
)

REM Check if node_modules exists in client
if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
    echo.
)

echo [OK] All dependencies are ready
echo.

REM Find an available port starting from 3000
echo [INFO] Searching for an available port...
set PORT=3000
set MAX_PORT=3100

:FIND_PORT
if %PORT% gtr %MAX_PORT% (
    echo [ERROR] Could not find an available port between 3000-3100
    echo Please free some ports and try again.
    pause
    exit /b 1
)

netstat -ano | findstr :%PORT% | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    set /a PORT+=1
    goto FIND_PORT
)

if %PORT% neq 3000 (
    echo [WARNING] Port 3000 is in use, using port %PORT% instead
) else (
    echo [OK] Port 3000 is available
)
echo.

echo.
echo ============================================
echo    Starting ChairShare preview
echo    http://localhost:%PORT%
echo ============================================
echo.
echo    The application will open in your browser shortly...
echo    Press Ctrl+C to stop the preview server
echo.
echo ============================================
echo.

REM Wait a moment before starting
timeout /t 2 /nobreak >nul

REM Start browser in background after a delay
start "" cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:%PORT%"

REM Start the development server
set PORT=%PORT%
call npm start
