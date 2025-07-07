"use client";
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../app/features/auth/authSlice';

const Navbar = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f5f5f5' }}>
      <h1>Navbar</h1>
      <div>
        {(!auth?.isLoading && auth?.user) ? (
          <>
            <Link href="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
            <button onClick={handleSignOut}>Sign Out</button>
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
