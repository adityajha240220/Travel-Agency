'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import api from '@/services/api';

export default function TravelPortal() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const data = await api.auth.profile(token);
          setUser(data);
        } catch (error) {
          console.error('Profile fetch failed:', error);
          localStorage.removeItem('authToken');
          setToken(null);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };
    fetchProfile();
  }, [token, router]);

  const handleLogout = async () => {
    if (token) {
      try {
        await api.auth.logout();
        localStorage.removeItem('authToken');
        setToken(null);
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.full_name || user.email}!</h2>
        <p className="mb-4">This is your personalized travel dashboard.</p>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}