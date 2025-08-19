'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    if (isClient) {
      localStorage.removeItem('authToken');
      router.push('/');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isClient) {
      try {
        const response = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('authToken', data.token);
          router.push('/planner');
          setIsAuthOpen(false);
        } else {
          alert(data.detail || 'Login failed.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isClient) {
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      try {
        const response = await fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, full_name: fullName, phone_number: phoneNumber }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Registration successful! Please log in.');
          setIsLogin(true);
        } else {
          alert(data.detail || 'Signup failed.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const toggleAuth = () => setIsAuthOpen(!isAuthOpen);
  const switchAuth = () => setIsLogin(!isLogin);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-300">Travel Odyssey</h2>
        <div className="space-x-4">
          {isClient && (
            <>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); router.push('/about'); }}
                className="hover:text-yellow-300 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); router.push('/contact'); }}
                className="hover:text-yellow-300 transition-colors"
              >
                Contact
              </a>
              {localStorage.getItem('authToken') ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => router.push('/planner')}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Planner
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleAuth}
                  className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
                >
                  Login/Signup
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isAuthOpen && !localStorage.getItem('authToken') && (
        <div className="absolute top-16 right-4 bg-white p-6 rounded-lg shadow-lg text-black w-80">
          <h2 className="text-xl font-bold mb-4 text-center">
            {isLogin ? 'Welcome Back!' : 'Join the Adventure!'}
          </h2>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="+1234567890"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="••••••••"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
            <p className="text-center text-sm mt-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchAuth}
                className="text-yellow-600 ml-1 hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </form>
        </div>
      )}
    </nav>
  );
}