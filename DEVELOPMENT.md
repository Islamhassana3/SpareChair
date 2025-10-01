# ChairShare Development Guide

## Quick Start (Local Development)

1. **Install Dependencies**

   ```bash
   npm run install-deps
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   # Edit .env with your database URL and API keys
   ```

3. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## Project Structure

```
SpareChair/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── server/                 # Express.js backend
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Custom middleware
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   └── utils/              # Utility functions
├── prisma/                 # Database schema and migrations
├── uploads/                # File uploads (development)
└── docs/                   # Documentation

```

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend server only
- `npm run client` - Start frontend only
- `npm run build` - Build for production
- `npm start` - Start production server

## API Testing

Use the `/api/health` endpoint to test if the backend is running:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "ChairShare API is running"
}
```

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- Database schema is defined in `prisma/schema.prisma`
- Environment variables are required for full functionality
- Stripe keys needed for payment processing
- PostgreSQL database required for data persistence
