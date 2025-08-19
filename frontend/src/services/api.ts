import { NextRequest } from 'next/server';

interface ApiResponse {
  token?: string;
  user?: any;
  detail?: string;
  [key: string]: any; // Allow additional fields for errors
}

interface LoginSuccessResponse {
  token: string;
  user: any;
}

const getApiUrl = (path: string) => `/api${path}`;

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<LoginSuccessResponse> => {
      const res = await fetch(getApiUrl('/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw data; // Throw the full response for error handling
      if (!data.token) throw new Error('Token missing in response');
      return data as LoginSuccessResponse;
    },
    signup: async (data: { email: string; password: string; full_name: string; phone_number?: string }): Promise<ApiResponse> => {
      const res = await fetch(getApiUrl('/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw responseData; // Throw detailed error
      return responseData;
    },
    profile: async (token: string): Promise<ApiResponse> => {
      const res = await fetch(getApiUrl('/profile'), {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Profile fetch failed');
      return data;
    },
    logout: async (): Promise<ApiResponse> => {
      const token = localStorage.getItem('authToken');
      const res = await fetch(getApiUrl('/logout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Logout failed');
      return data;
    },
  },
  planner: {
    generatePlan: async (token: string, data: { source: string; destination: string; duration: number; budget: number; styles: string[] }): Promise<ApiResponse> => {
      const res = await fetch(getApiUrl('/planner'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error('Plan generation failed');
      return responseData;
    },
  },
};

export default api;