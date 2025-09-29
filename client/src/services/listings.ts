import api from './api';
import { Listing, ListingsResponse } from '../types';

export const listingService = {
  getListings: async (params?: {
    page?: number;
    limit?: number;
    city?: string;
    businessType?: string;
    spaceType?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Promise<ListingsResponse> => {
    const response = await api.get('/listings', { params });
    return response.data;
  },

  getListing: async (id: string): Promise<Listing> => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  createListing: async (data: Partial<Listing>): Promise<{ listing: Listing }> => {
    const response = await api.post('/listings', data);
    return response.data;
  },

  updateListing: async (id: string, data: Partial<Listing>): Promise<{ listing: Listing }> => {
    const response = await api.put(`/listings/${id}`, data);
    return response.data;
  },

  deleteListing: async (id: string): Promise<void> => {
    await api.delete(`/listings/${id}`);
  },

  getMyListings: async (): Promise<{ listings: Listing[] }> => {
    const response = await api.get('/listings/host/my-listings');
    return response.data;
  },
};