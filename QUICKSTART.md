# ChairShare Quick Start Guide

Get ChairShare running in 5 minutes! This guide assumes you have Node.js and PostgreSQL already installed.

## Prerequisites Check

Before starting, make sure you have:

- ✅ Node.js v18 or higher (`node --version`)
- ✅ npm v9 or higher (`npm --version`)
- ✅ PostgreSQL installed and running (`pg_isready`)

## 5-Minute Setup

### 1. Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/Islamhassana3/SpareChair.git
cd SpareChair

# Install all dependencies (root + client)
npm run install-deps
```

### 2. Configure Environment (1 minute)

```bash
# Create .env file
cp .env.example .env

# Generate a secure JWT secret
echo "JWT_SECRET=\"$(openssl rand -base64 32)\"" >> .env.tmp && 
  cat .env | grep -v "JWT_SECRET=" > .env.tmp && 
  cat .env.tmp > .env && 
  rm .env.tmp

# Edit .env to set your PostgreSQL database URL
nano .env  # or use your preferred editor
```

**Minimum required changes in `.env`:**
```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/chairshare"
```

### 3. Setup Database (1 minute)

```bash
# Create the database (if it doesn't exist)
createdb chairshare

# Generate Prisma client and create tables
npx prisma generate
npx prisma db push
```

### 4. Verify Setup (30 seconds)

```bash
# Optional but recommended - verify everything is configured
./verify-setup.sh
```

### 5. Start the Application (30 seconds)

```bash
# Start both frontend and backend
npm run dev
```

**Wait for these messages:**
- ✅ Backend: `ChairShare server running on 0.0.0.0:5000`
- ✅ Frontend: `webpack compiled successfully`

### 6. Access the Application

Open your browser and go to:
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5000/api/health

## What to Do Next

### Create Your First User

1. Go to http://localhost:3000/register
2. Fill in the registration form
3. Choose "Host" if you want to list spaces, or "Guest" to book spaces

### Explore the Features

- **Browse Spaces**: Click "Find Spaces" to see available listings
- **Create a Listing**: Register as a Host and create your first space listing
- **View Dashboard**: Check your bookings and manage your profile

## Common Issues

### "Cannot connect to server" error

**Problem**: Backend is not running

**Solution**:
```bash
# Open a new terminal and start the backend separately
npm run server

# Check if it's running
curl http://localhost:5000/api/health
```

### Prisma errors

**Problem**: Database connection or Prisma client issues

**Solution**:
```bash
# Regenerate Prisma client
npx prisma generate

# Make sure PostgreSQL is running
pg_isready

# Check your DATABASE_URL in .env
```

### Port already in use

**Problem**: Another process is using port 3000 or 5000

**Solution**:
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

## Need More Help?

- 📚 **Full Documentation**: See [README.md](./README.md)
- 🔧 **Troubleshooting**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- 🛠️ **Development Guide**: See [DEVELOPMENT.md](./DEVELOPMENT.md)

## Development Workflow

```bash
# Start development (watches for changes)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build

# View database in browser
npx prisma studio
```

## Testing the Setup

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","message":"ChairShare API is running"}
```

### Test Frontend

Open http://localhost:3000 in your browser. You should see the ChairShare homepage.

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both servers |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run build` | Build for production |
| `./verify-setup.sh` | Verify installation |
| `npx prisma studio` | Open database GUI |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma db push` | Update database schema |

## Next Steps

Once you have the app running:

1. **Register an account** at http://localhost:3000/register
2. **Explore the platform** - browse spaces, create listings
3. **Customize** - modify the code to fit your needs
4. **Deploy** - See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for production deployment

## Getting Help

If you're stuck:

1. Run `./verify-setup.sh` to diagnose issues
2. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions
3. Look at the error messages carefully - they now include helpful hints
4. Open an issue on GitHub with:
   - Error messages
   - Output from `./verify-setup.sh`
   - Your Node.js version (`node --version`)
   - Your OS

---

**Happy coding! 🚀**

Need help? Open an issue on GitHub or check the documentation.
