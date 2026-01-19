import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.params = {
      ...config.params,
      token,
    };
  }
  return config;
});

export interface Item {
  id?: string;
  name: string;
  description: string;
  user_id: string;
}

export interface CreateItem {
  name: string;
  description: string;
}

export const api = {
  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  // Get all items
  getItems: async (limit: number = 10) => {
    const response = await apiClient.get<Item[]>('/items', { params: { limit } });
    return response.data;
  },

  // Get a specific item
  getItem: async (itemId: string) => {
    const response = await apiClient.get<Item>(`/items/${itemId}`);
    return response.data;
  },

  // Create a new item
  createItem: async (item: CreateItem) => {
    const response = await apiClient.post<Item>('/items', item);
    return response.data;
  },

  // Update an item
  updateItem: async (itemId: string, item: CreateItem) => {
    const response = await apiClient.put<Item>(`/items/${itemId}`, item);
    return response.data;
  },

  // Delete an item
  deleteItem: async (itemId: string) => {
    const response = await apiClient.delete(`/items/${itemId}`);
    return response.data;
  },
};

export default apiClient;
