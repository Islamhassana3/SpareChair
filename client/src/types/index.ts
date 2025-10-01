export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  userType: 'GUEST' | 'HOST' | 'ADMIN';
  businessName?: string;
  businessType?: string;
  businessAddress?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  businessType: BusinessType;
  spaceType: SpaceType;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  pricePerHour: number;
  pricePerDay?: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  host: {
    id: string;
    firstName: string;
    lastName: string;
    businessName?: string;
    avatar?: string;
  };
  averageRating?: number;
  reviewCount?: number;
}

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalAmount: number;
  status: BookingStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
  listing: {
    id: string;
    title: string;
    address: string;
    city: string;
    images: string[];
    pricePerHour: number;
    host: {
      id: string;
      firstName: string;
      lastName: string;
      businessName?: string;
    };
  };
  guest: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  payment?: Payment;
  review?: Review;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  guest: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  listing: {
    id: string;
    title: string;
  };
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  stripePaymentId?: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export type BusinessType =
  | 'SALON'
  | 'BARBERSHOP'
  | 'SPA'
  | 'MASSAGE_THERAPY'
  | 'NAIL_SALON'
  | 'TATTOO_PARLOR'
  | 'PHOTOGRAPHY_STUDIO'
  | 'MUSIC_STUDIO'
  | 'ART_STUDIO'
  | 'DANCE_STUDIO'
  | 'FITNESS_STUDIO'
  | 'COWORKING_SPACE'
  | 'MEDICAL_OFFICE'
  | 'THERAPY_OFFICE'
  | 'OTHER';

export type SpaceType = 'CHAIR' | 'ROOM' | 'STATION' | 'DESK' | 'STUDIO' | 'OFFICE' | 'OTHER';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ListingsResponse {
  listings: Listing[];
  pagination: PaginationInfo;
}
