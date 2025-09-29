import api from './api';
import { Booking } from '../types';

export const bookingService = {
  createBooking: async (data: {
    listingId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    message?: string;
  }): Promise<{ booking: Booking }> => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  getBookings: async (params?: {
    status?: string;
    type?: 'guest' | 'host';
  }): Promise<{ bookings: Booking[] }> => {
    const response = await api.get('/bookings', { params });
    return response.data;
  },

  getBooking: async (id: string): Promise<{ booking: Booking }> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  updateBookingStatus: async (id: string, status: string): Promise<{ booking: Booking }> => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  cancelBooking: async (id: string): Promise<{ booking: Booking }> => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
};