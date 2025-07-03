"use client"
import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../app/features/auth/authSlice';

export default function Navbar() {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn)
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f5f5f5' }}>
      <h1>Navbar</h1>
      <div>
        {!isSignedIn ? (
          <>
            <Link href="/signIn" style={{ marginRight: '1rem' }}>Sign In</Link>
            <Link href="/signUp" style={{ marginRight: '1rem' }}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link href="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  )
}
