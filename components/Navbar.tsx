"use client";
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../app/features/auth/authSlice';

const Navbar = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleSignOut = () => {
    dispatch(signOut());
    setDropdownOpen(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f5f5f5' }}>
      <h1>Navbar</h1>
      <div style={{ position: 'relative' }}>
        {(!auth?.isLoading && auth?.user) ? (
          <>
            <Link href="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
            <Link href="/profile" style={{ marginRight: '1rem' }} onClick={handleProfileClick}>
              Profile
            </Link>
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: '2.5rem', right: 0, background: '#fff', border: '1px solid #ccc', borderRadius: '0.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <button onClick={handleSignOut} style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link href="/signIn" style={{ marginRight: '1rem' }}>Sign In</Link>
            <Link href="/signUp" style={{ marginRight: '1rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
