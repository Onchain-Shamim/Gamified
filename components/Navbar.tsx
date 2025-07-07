'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../app/features/auth/authSlice';

const Navbar = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    dispatch(signOut());
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setDropdownOpen(prev => !prev);
  };

  // Handle outside click
  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800"><Link href="/">Navbar</Link></h1>

      <div className="flex items-center gap-4">
        {(!auth?.isLoading && auth?.user) ? (
          <>
            <Link
              href="/private/dashboard"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>

            {/* 👇 Wrap both button and dropdown in this ref */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="ml-2 text-gray-800 hover:text-blue-600 transition focus:outline-none"
              >
                Profile
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    href="/private/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/signIn"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signUp"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
