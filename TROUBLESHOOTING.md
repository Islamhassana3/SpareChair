# ChairShare Troubleshooting Guide

This guide helps you diagnose and fix common issues when setting up or running ChairShare.

## 🚨 Quick Diagnostics

If you're experiencing issues, run this quick check:

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check if frontend is running
curl http://localhost:3000
```

## Common Issues

### 1. "Login failed" or "Cannot connect to backend"

**Symptoms:**
- Frontend loads but login doesn't work
- Network errors in browser console: `ERR_CONNECTION_REFUSED`
- Error message: "Login failed"

**Cause:** Backend server is not running or not accessible.

**Solution:**

1. **Check if backend is running:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **If not running, check backend logs:**
   ```bash
   # Try to start backend
   cd SpareChair
   npm run server
   ```

3. **Common backend startup issues:**

   a) **Prisma Client not generated:**
   ```
   Error: @prisma/client did not initialize yet. Please run "prisma generate"
   ```
   **Fix:**
   ```bash
   npx prisma generate
   ```

   b) **Database connection failed:**
   ```
   Error: Can't reach database server
   ```
   **Fix:**
   - Ensure PostgreSQL is running: `pg_isready` or start PostgreSQL service
   - Check DATABASE_URL in `.env` file
   - Verify database credentials are correct

   c) **Missing .env file:**
   ```
   Error: Missing required environment variables
   ```
   **Fix:**
   ```bash
   cp .env.example .env
   # Then edit .env with your values
   ```

### 2. Prisma Client Generation Fails

**Symptoms:**
- `npx prisma generate` fails
- Error about missing Prisma engines

**Solution:**

1. **Clear Prisma cache:**
   ```bash
   rm -rf node_modules/.prisma
   rm -rf node_modules/@prisma
   ```

2. **Reinstall Prisma:**
   ```bash
   npm install prisma @prisma/client --force
   npx prisma generate
   ```

3. **Check network/firewall:**
   - Prisma needs to download engines from binaries.prisma.sh
   - If behind a firewall, check proxy settings

### 3. Database Connection Issues

**Symptoms:**
- Backend starts but crashes when accessing database
- Error: "Can't reach database server"
- Error: "Connection refused"

**Solution:**

1. **Verify PostgreSQL is running:**
   ```bash
   # On macOS/Linux
   pg_isready
   
   # Or check the service
   sudo systemctl status postgresql  # Linux
   brew services list                 # macOS
   ```

2. **Test database connection:**
   ```bash
   # Try connecting with psql
   psql -U username -d chairshare -h localhost -p 5432
   ```

3. **Check DATABASE_URL format:**
   ```
   # Correct format:
   DATABASE_URL="postgresql://username:password@localhost:5432/chairshare"
   
   # Common mistakes:
   # ❌ Missing database name
   # ❌ Wrong port (default is 5432)
   # ❌ Special characters in password not URL-encoded
   ```

4. **Create database if it doesn't exist:**
   ```bash
   createdb chairshare
   # Or with psql:
   psql -U postgres -c "CREATE DATABASE chairshare;"
   ```

5. **Run Prisma migrations:**
   ```bash
   npx prisma db push
   ```

### 4. Port Already in Use

**Symptoms:**
- Error: "Port 3000 is already in use"
- Error: "Port 5000 is already in use"

**Solution:**

1. **Find and kill process using the port:**
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9   # For frontend
   lsof -ti:5000 | xargs kill -9   # For backend
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Use different ports:**
   ```bash
   # Backend
   PORT=5001 npm run server
   
   # Update client/package.json proxy or .env
   CLIENT_URL=http://localhost:3001
   ```

### 5. Dependencies Installation Issues

**Symptoms:**
- `npm install` fails
- Missing modules errors
- Version conflicts

**Solution:**

1. **Clear npm cache and reinstall:**
   ```bash
   # Clear cache
   npm cache clean --force
   
   # Delete node_modules
   rm -rf node_modules
   rm -rf client/node_modules
   rm package-lock.json
   rm client/package-lock.json
   
   # Reinstall
   npm install
   cd client && npm install && cd ..
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be v18 or higher
   npm --version   # Should be v9 or higher
   ```

3. **Update npm if needed:**
   ```bash
   npm install -g npm@latest
   ```

### 6. Frontend Build Issues

**Symptoms:**
- React app won't compile
- TypeScript errors
- Module not found errors

**Solution:**

1. **Clear React cache:**
   ```bash
   cd client
   rm -rf node_modules/.cache
   rm -rf build
   ```

2. **Reinstall client dependencies:**
   ```bash
   cd client
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Check for TypeScript errors:**
   ```bash
   cd client
   npm run build
   ```

### 7. Environment Variables Not Loading

**Symptoms:**
- Backend uses default values
- Features not working (Stripe, email, etc.)
- Errors about missing config

**Solution:**

1. **Verify .env file exists:**
   ```bash
   ls -la .env
   ```

2. **Check .env is loaded:**
   ```bash
   # Add this to your code temporarily
   console.log('DATABASE_URL:', process.env.DATABASE_URL);
   ```

3. **Ensure .env is in the root directory:**
   ```
   SpareChair/
   ├── .env          ← Should be here
   ├── client/
   ├── server/
   └── package.json
   ```

4. **Restart servers after .env changes:**
   - Environment variables are loaded at startup
   - Changes require restart to take effect

### 8. CORS Errors

**Symptoms:**
- Browser console: "CORS policy" errors
- API requests blocked
- "No 'Access-Control-Allow-Origin' header"

**Solution:**

1. **Check CLIENT_URL in .env:**
   ```bash
   CLIENT_URL=http://localhost:3000
   ```

2. **Verify CORS configuration in server/index.js:**
   ```javascript
   app.use(cors({
     origin: process.env.CLIENT_URL || 'http://localhost:3000',
     credentials: true
   }));
   ```

3. **Clear browser cache:**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Or clear cache in browser settings

## Step-by-Step Setup Verification

If you're still having issues, follow this complete verification process:

### Step 1: Check Prerequisites

```bash
# Check Node.js (should be v18+)
node --version

# Check npm (should be v9+)
npm --version

# Check PostgreSQL
pg_isready
# Or
psql --version
```

### Step 2: Clone and Install

```bash
git clone https://github.com/Islamhassana3/SpareChair.git
cd SpareChair

# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### Step 3: Configure Environment

```bash
# Copy example env
cp .env.example .env

# Edit .env with your values
nano .env  # or use your preferred editor
```

**Required environment variables:**
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Random secret key (generate with: `openssl rand -base64 32`)
- Other values can use defaults for development

### Step 4: Setup Database

```bash
# Create database
createdb chairshare

# Generate Prisma client
npx prisma generate

# Create tables
npx prisma db push

# Verify tables were created
npx prisma studio  # Opens GUI to view database
```

### Step 5: Start Servers

```bash
# Option 1: Start both (recommended for development)
npm run dev

# Option 2: Start separately
# Terminal 1:
npm run server

# Terminal 2:
npm run client
```

### Step 6: Verify Everything Works

```bash
# Test backend
curl http://localhost:5000/api/health
# Should return: {"status":"OK","message":"ChairShare API is running"}

# Test frontend
curl http://localhost:3000
# Should return HTML content

# Test in browser
# Open: http://localhost:3000
# You should see the homepage
```

## Getting Help

If you're still experiencing issues after trying these solutions:

1. **Check logs:**
   - Backend logs in terminal running `npm run server`
   - Frontend logs in browser console (F12)
   - Check `logs/` directory if it exists

2. **Create an issue on GitHub:**
   - Include error messages
   - Include your Node.js and npm versions
   - Include relevant log snippets
   - Describe what you've already tried

3. **Common log locations:**
   ```bash
   # Backend logs
   tail -f logs/combined.log
   tail -f logs/error.log
   
   # PM2 logs (if using PM2)
   pm2 logs
   ```

## Development vs Production

### Development Mode
- Uses `npm run dev`
- Hot reloading enabled
- Detailed error messages
- CORS more permissive

### Production Mode
- Uses `npm start`
- Optimized builds
- Security features enabled
- Requires proper environment configuration

## Quick Reference Commands

```bash
# Development
npm run dev              # Start both servers
npm run server          # Start backend only
npm run client          # Start frontend only

# Database
npx prisma generate     # Generate Prisma client
npx prisma db push      # Update database schema
npx prisma studio       # Open database GUI

# Troubleshooting
npm run install-deps    # Reinstall all dependencies
npm cache clean --force # Clear npm cache

# Testing
curl http://localhost:5000/api/health  # Test backend
curl http://localhost:3000              # Test frontend
```

## Still Not Working?

If you've tried everything and it's still not working, please:

1. Take screenshots of the errors
2. Copy the full error messages
3. Include your environment details:
   ```bash
   node --version
   npm --version
   pg_config --version
   cat .env.example  # Don't share actual .env with secrets!
   ```
4. Open an issue on GitHub with all this information

We're here to help! 🚀
