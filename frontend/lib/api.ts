const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const api = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/api/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.users;
  },

  async createUser(name: string, email: string): Promise<User> {
    const response = await fetch(`${API_URL}/api/users?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  async checkHealth(): Promise<{ status: string }> {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  },

  async getFirebaseStatus(): Promise<{ firebase_initialized: boolean; message: string }> {
    const response = await fetch(`${API_URL}/api/firebase-status`);
    if (!response.ok) {
      throw new Error('Failed to check Firebase status');
    }
    return response.json();
  },
};
