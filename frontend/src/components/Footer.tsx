'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    console.log('Footer mounted, setting current year:', new Date().getFullYear()); // Debug log
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white py-6 px-4 mt-10 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-yellow-300 mb-2">Travel Odyssey</h3>
          <p className="text-sm">
            Your gateway to unforgettable adventures across India and beyond. Explore, plan, and embark on epic journeys with us!
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-yellow-300 mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-yellow-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-300 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/planner" className="hover:text-yellow-300 transition-colors">
                Planner
              </Link>
            </li> {/* Added Planner link back */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-bold text-yellow-300 mb-2">Get in Touch</h3>
          <p className="text-sm">
            Email: <a href="mailto:support@travelodyssey.com" className="hover:text-yellow-300 underline">support@travelodyssey.com</a>
          </p>
          <p className="text-sm">Phone: +91-123-456-7890</p>
          <div className="mt-2 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <span className="sr-only">Facebook</span>FB
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <span className="sr-only">Twitter</span>TW
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <span className="sr-only">Instagram</span>IG
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
        <p>&copy; {currentYear} Travel Odyssey Agency. All rights reserved.</p>
      </div>
    </footer>
  );
}