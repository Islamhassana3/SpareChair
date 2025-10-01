# ChairShare

ChairShare is an Airbnb-style platform for service-based businesses with unused space. Salon owners, therapists, or studios can list spare chairs or rooms, set availability and pricing, and earn from underused capacity. Freelancers book spaces flexibly by the hour or day, with secure payments, ID verification, and reviews.

## 🚀 Quick Start

**New to ChairShare?** Get up and running in 5 minutes with our [Quick Start Guide](./QUICKSTART.md)!

```bash
npm run install-deps && cp .env.example .env
# Edit .env with your database URL
npx prisma generate && npx prisma db push
npm run dev
```

For detailed setup instructions, see the [Installation](#-installation) section below.

## 📋 Platform Review & Improvement Plan

**New!** A comprehensive review and improvement plan has been created for the ChairShare platform:

- **📘 [Full Review & Improvement Plan](./COMPREHENSIVE_REVIEW_AND_IMPROVEMENT_PLAN.md)** - Complete 300-item roadmap (1,280 lines)
- **📗 [Quick Summary](./IMPROVEMENT_PLAN_SUMMARY.md)** - At-a-glance overview with metrics (452 lines)
- **📙 [Getting Started Guide](./GETTING_STARTED_WITH_IMPROVEMENTS.md)** - Implementation guide with code examples (870 lines)
- **📕 [Documentation Index](./REVIEW_DOCUMENTATION_INDEX.md)** - Navigation guide for all docs (402 lines)

**Current Platform Score:** 44/100 | **Total Improvements:** 300 items | **Timeline:** 24 months in 6 phases

**Quick Wins Available:** 10 high-impact improvements can be implemented in just 2-3 weeks! See [Getting Started Guide](./GETTING_STARTED_WITH_IMPROVEMENTS.md).

## 🚀 Features

### For Space Seekers (Guests)

- **Discover Spaces**: Search and filter professional spaces by location, type, amenities, and price
- **Flexible Booking**: Book spaces by the hour or day with instant confirmation
- **Secure Payments**: Safe payment processing with Stripe integration
- **Review System**: Read and write reviews to build trust in the community
- **User Dashboard**: Track bookings, manage preferences, and view history

### For Space Providers (Hosts)

- **List Your Space**: Create detailed listings with photos, amenities, and pricing
- **Manage Availability**: Set your schedule and pricing preferences
- **Booking Management**: Accept/decline requests and communicate with guests
- **Earnings Tracking**: Monitor your income and payout schedule
- **Professional Profile**: Build your reputation through reviews and verification

### Core Platform Features

- **User Authentication**: Secure JWT-based authentication system
- **ID Verification**: Trust and safety through identity verification
- **Real-time Notifications**: Stay updated on bookings and messages
- **Mobile-Responsive**: Works seamlessly on desktop and mobile devices
- **Admin Dashboard**: Platform management and oversight tools

## 🛠️ Technology Stack

### Backend

- **Node.js** with Express.js framework
- **PostgreSQL** database with Prisma ORM
- **JWT** for authentication
- **Stripe** for payment processing
- **Multer** for file uploads
- **Nodemailer** for email notifications

### Frontend

- **React** with TypeScript
- **Material-UI** for component library
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management

### Database Schema

- **Users**: Authentication and profile management
- **Listings**: Space details and host information
- **Bookings**: Reservation management and status tracking
- **Reviews**: Rating and feedback system
- **Payments**: Transaction processing and records
- **Availability**: Time slot management

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Stripe account for payments

### Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/Islamhassana3/SpareChair.git
cd SpareChair
```

2. **Install dependencies**

```bash
npm run install-deps
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
DATABASE_URL="postgresql://username:password@localhost:5432/chairshare"
JWT_SECRET="your-jwt-secret-key-here"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
```

5. **Verify your setup (optional but recommended)**

```bash
./verify-setup.sh
```

This script checks if all prerequisites are installed and properly configured.

6. **Start the development servers**

```bash
npm run dev
```

This will start:

- Backend server on http://localhost:5000
- React frontend on http://localhost:3000

### ⚠️ Common Issues

If you encounter problems during setup, check these common issues:

**"Login failed" or cannot connect to backend:**
- Ensure backend is running on port 5000
- Run `curl http://localhost:5000/api/health` to verify
- Check that `.env` file exists and has correct values

**Prisma errors:**
- Run `npx prisma generate` if you see "@prisma/client did not initialize"
- Ensure PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env` is correct

**Port already in use:**
- Kill existing processes: `lsof -ti:5000 | xargs kill -9` (backend) or `lsof -ti:3000 | xargs kill -9` (frontend)

📚 **For detailed troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

## 🚀 Usage

### Development

```bash
# Start both frontend and backend
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build for production
npm run build
```

### Production Deployment

```bash
# Build the React app
npm run build

# Start production server
npm start
```

## 🚀 Railway.app Deployment

ChairShare is optimized for deployment on Railway.app with the following features:

### Quick Deploy

1. **One-Click Deploy**: Connect your GitHub repository to Railway
2. **Auto-Configuration**: Includes `railway.toml`, `nixpacks.toml`, and `Procfile`
3. **Database Setup**: Add PostgreSQL service for automatic DATABASE_URL configuration

### Railway-Specific Optimizations

- ✅ **Optimized Build Process**: Efficient multi-stage build with dependency caching
- ✅ **Health Checks**: Enhanced `/api/health` endpoint with database connectivity monitoring
- ✅ **Environment Handling**: Production-ready CORS and proxy configuration
- ✅ **Database Migrations**: Automatic Prisma client generation and schema deployment
- ✅ **Static File Serving**: Optimized React build serving from Express server
- ✅ **Process Management**: Railway-aware startup scripts and error handling

### Configuration Files

- `railway.toml` - Railway platform configuration
- `nixpacks.toml` - Build environment specification
- `Procfile` - Process definition for Railway
- `start.sh` - Railway-optimized startup script
- `.env.railway` - Environment variable template
- `RAILWAY_DEPLOYMENT.md` - Detailed deployment guide

### Required Environment Variables

```bash
DATABASE_URL=postgresql://...    # Auto-provided by Railway PostgreSQL
JWT_SECRET=your-secure-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NODE_ENV=production
CLIENT_URL=https://your-app.railway.app
```

📋 **See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete deployment guide**

## 📱 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Listings

- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get specific listing
- `POST /api/listings` - Create new listing (Host only)
- `PUT /api/listings/:id` - Update listing (Host only)
- `DELETE /api/listings/:id` - Delete listing (Host only)

### Bookings

- `POST /api/bookings` - Create booking request
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id/status` - Update booking status (Host only)
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Reviews

- `POST /api/reviews` - Create review
- `GET /api/reviews` - Get reviews (with filters)
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🎯 Business Types Supported

- Salon & Barbershop
- Spa & Massage Therapy
- Nail Salon
- Tattoo Parlor
- Photography Studio
- Music Studio
- Art Studio
- Dance Studio
- Fitness Studio
- Coworking Space
- Medical Office
- Therapy Office
- And more...

## 💡 Space Types Available

- Individual Chairs
- Private Rooms
- Work Stations
- Desks
- Studios
- Offices
- Custom Spaces

## 🔐 Security Features

- **Authentication**: JWT-based secure authentication
- **Data Validation**: Input validation and sanitization
- **Payment Security**: PCI-compliant payment processing
- **ID Verification**: Identity verification for trust and safety
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention

## 🎨 User Interface

The platform features a modern, responsive design built with Material-UI:

- **Clean Navigation**: Intuitive header with user-specific options
- **Search & Filters**: Advanced filtering for finding perfect spaces
- **Interactive Cards**: Engaging listing displays with key information
- **Mobile-First**: Responsive design that works on all devices
- **Accessible**: Following WCAG guidelines for accessibility

## 🔄 Booking Flow

1. **Guest searches** for spaces using filters
2. **Guest selects** a space and views details
3. **Guest submits** booking request with dates/times
4. **Host receives** notification and can accept/decline
5. **Payment processing** occurs upon confirmation
6. **Space usage** and review system post-completion

## 📊 Revenue Model

- **Commission**: Platform fee on successful bookings
- **Premium Features**: Enhanced listings and priority placement
- **Verification Services**: ID and business verification fees
- **Payment Processing**: Transaction fees

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

For support, email support@chairshare.com or create an issue in the GitHub repository.

## 🔮 Future Enhancements

- **Mobile Apps**: Native iOS and Android applications
- **Real-time Chat**: In-app messaging between hosts and guests
- **Calendar Integration**: Sync with Google Calendar and other platforms
- **Advanced Analytics**: Detailed insights for hosts and admins
- **Multi-language Support**: Internationalization
- **AI Recommendations**: Smart space suggestions based on user behavior
- **Virtual Tours**: 360° space previews
- **Insurance Integration**: Protection for hosts and guests

---

Built with ❤️ by the ChairShare Team
