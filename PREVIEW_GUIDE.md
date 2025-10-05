# ChairShare Quick Preview Guide

This guide explains how to use the new preview scripts to quickly launch and view ChairShare in your browser.

## 🚀 Overview

The preview scripts provide a one-click solution to:
- ✅ Check and install dependencies automatically
- ✅ Automatically find an available port (starting from 3000)
- ✅ Start the frontend development server on the selected port
- ✅ Automatically open the application in your default browser

## 📋 Prerequisites

Before running the preview scripts, ensure you have:
- Node.js 18 or higher installed
- npm 9 or higher installed

## 🎯 Usage

### Linux / macOS

```bash
./preview.sh
```

### Windows (Command Prompt)

```cmd
preview.bat
```

### Windows (PowerShell)

```powershell
.\preview.ps1
```

## 🔍 What the Scripts Do

1. **Dependency Check**: Verifies Node.js and npm are installed
2. **Auto-Install**: Checks if `node_modules` exists and installs dependencies if needed
3. **Port Detection**: Automatically finds an available port starting from 3000 (uses 3001, 3002, etc. if 3000 is busy)
4. **Server Start**: Launches the React development server on the detected port
5. **Browser Launch**: Automatically opens the application in your default browser at the correct port

## 🛠️ Troubleshooting

### Port Selection

The scripts automatically find an available port starting from 3000:
- If port 3000 is free, it will use port 3000
- If port 3000 is busy, it will automatically use the next available port (3001, 3002, etc.)
- The script searches up to port 3100 for an available port
- The selected port will be displayed in the startup message

### Dependencies Not Installing

If dependency installation fails:
1. Check your internet connection
2. Ensure you have sufficient disk space
3. Try running `npm install` manually in the root directory
4. Try running `npm install` manually in the `client` directory

### Browser Not Opening

If the browser doesn't open automatically:
- Check the terminal output for the port number being used
- Manually open `http://localhost:PORT` in your browser (replace PORT with the number shown)
- The server will still be running in the terminal

### No Available Ports

If you see "Could not find an available port between 3000-3100":
- Close some applications that might be using ports in this range
- Or manually free specific ports (see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md))

## 📝 Notes

- The preview scripts only start the **frontend** server (on an automatically selected port)
- The scripts will use port 3000 by default, but will automatically find the next available port if needed
- For full functionality (authentication, bookings, etc.), you'll need to:
  1. Set up the database (see [QUICKSTART.md](./QUICKSTART.md))
  2. Configure environment variables (`.env` file)
  3. Start both frontend and backend with `npm run dev`

## 🔗 Related Documentation

- [README.md](./README.md) - Full project documentation
- [QUICKSTART.md](./QUICKSTART.md) - Complete setup guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Troubleshooting common issues

