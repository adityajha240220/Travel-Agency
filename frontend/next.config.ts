import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://192.168.198.1', 'http://localhost:3000'],
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'http://localhost:8000/api/login/',
      },
      {
        source: '/api/register',
        destination: 'http://localhost:8000/api/register/',
      },
      {
        source: '/api/profile',
        destination: 'http://localhost:8000/api/profile/',
      },
      {
        source: '/api/logout',
        destination: 'http://localhost:8000/api/logout/',
      },
      {
        source: '/planner',
        destination: 'http://localhost:8000/planner/',
      },
    ];
  },
};

export default nextConfig;