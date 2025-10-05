# ChairShare Quick Preview Guide

This guide explains how to use the new preview scripts to quickly launch and view ChairShare in your browser.

## 🚀 Overview

The preview scripts provide a one-click solution to:
- ✅ Check and install dependencies automatically
- ✅ Start the frontend development server on port 3000
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
3. **Port Check**: Detects if port 3000 is already in use and offers to free it
4. **Server Start**: Launches the React development server on port 3000
5. **Browser Launch**: Automatically opens http://localhost:3000 in your default browser

## 🛠️ Troubleshooting

### Port 3000 Already in Use

If you see a message that port 3000 is already in use, the script will ask if you want to kill the existing process. Type `y` to proceed or `n` to exit and manually free the port.

### Dependencies Not Installing

If dependency installation fails:
1. Check your internet connection
2. Ensure you have sufficient disk space
3. Try running `npm install` manually in the root directory
4. Try running `npm install` manually in the `client` directory

### Browser Not Opening

If the browser doesn't open automatically:
- Manually open http://localhost:3000 in your browser
- The server will still be running in the terminal

## 📝 Notes

- The preview scripts only start the **frontend** server on port 3000
- For full functionality (authentication, bookings, etc.), you'll need to:
  1. Set up the database (see [QUICKSTART.md](./QUICKSTART.md))
  2. Configure environment variables (`.env` file)
  3. Start both frontend and backend with `npm run dev`

## 🔗 Related Documentation

- [README.md](./README.md) - Full project documentation
- [QUICKSTART.md](./QUICKSTART.md) - Complete setup guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Troubleshooting common issues

