

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const router = useRouter();
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    console.log('Component mounted, isContentVisible:', isContentVisible); // Debug mount
    if (!isContentVisible) {
      console.log('Content is hidden initially, click "Explore Adventures" to show');
    }
  }, [isContentVisible]);

  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: 'Himalayan Trek - Uttarakhand',
      price: 4500,
      time: '06:00 AM',
      date: '2025-09-05',
      availability: 12,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      destination: 'Rajasthan Desert Safari',
      price: 3500,
      time: '07:00 AM',
      date: '2025-09-10',
      availability: 18,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      destination: 'Goa Adventure Camp',
      price: 4000,
      time: '08:00 AM',
      date: '2025-09-15',
      availability: 5,
      image: 'https://images.unsplash.com/photo-1514715094890-3a4d100e1f7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 4,
      destination: 'Andaman Island Diving',
      price: 6000,
      time: '09:00 AM',
      date: '2025-09-20',
      availability: 10,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 5,
      destination: 'Kerala Backwater Kayaking',
      price: 5500,
      time: '07:30 AM',
      date: '2025-09-25',
      availability: 15,
      image: 'https://images.unsplash.com/photo-1518684079-3c828fe8e35c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 6,
      destination: 'Leh Ladakh Bike Expedition',
      price: 7000,
      time: '06:30 AM',
      date: '2025-10-01',
      availability: 8,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
  ]);

  const handleRegisterTrip = (tripId: number) => {
    console.log('Register clicked for trip:', tripId);
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      console.log('Token found, redirecting to planner');
      router.push('/planner');
    } else {
      console.log('No token, opening auth');
      const navbar = document.querySelector('nav');
      if (navbar) {
        const loginButton = navbar.querySelector('button.bg-yellow-600');
        if (loginButton) {
          console.log('Triggering login/signup click');
          loginButton.click();
        } else {
          console.error('Login/Signup button not found');
        }
      } else {
        console.error('Navbar not found');
      }
    }
  };

  const toggleContent = () => {
    console.log('Toggling content, new state:', !isContentVisible);
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-800 text-white relative overflow-visible">
      <img
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        alt="Adventure Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-20 flex flex-col items-center p-6 pt-20 min-h-screen">
        <button
          onClick={toggleContent}
          className="bg-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors mb-8"
        >
          Explore Adventures
        </button>
        <div
          className={`transition-all duration-700 ease-in-out transform ${
            isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          } w-full`}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center text-yellow-300 animate-pulse">
            Embark on an Epic Adventure!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center text-white animate-fade-in">
            Unleash your inner explorer with thrilling trips across India’s diverse landscapes—treks, safaris, diving, and more!
          </p>
          <p className="text-lg mb-8 text-center text-white italic">
            "Adventure is worthwhile in itself." – Amelia Earhart
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full px-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4 text-black relative overflow-hidden group"
                style={{ backgroundImage: `url(${trip.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-white">{trip.destination}</h3>
                  <p className="mb-1 text-white">Price: ₹{trip.price}</p>
                  <p className="mb-1 text-white">Time: {trip.time}</p>
                  <p className="mb-1 text-white">Date: {trip.date}</p>
                  <p className="mb-1 text-white">Availability: {trip.availability}/20 seats</p>
                  <button
                    onClick={() => handleRegisterTrip(trip.id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center w-full px-4">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Featured Destinations</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer">
                Himalayas
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer">
                Rajasthan
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer">
                Goa
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer">
                Andaman
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer">
                Kerala
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer">
                Ladakh
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  .animate-fade-in { animation: fadeIn 1s ease-in-out; }
  .animate-pulse { animation: pulse 2s infinite; }
  .group:hover .transition-opacity { opacity: 0.7; }
`}</style>