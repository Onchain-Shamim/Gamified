'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const user = useSelector((state: any) => state.auth.user);

  // Local state for form fields
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    role: user?.role || '',
    photoUrl: user?.photoUrl || '',
  });

  if (!user) {
    return (
      <div className="bg-gray-100 p-8 mt-4 rounded-lg shadow-md max-w-md mx-auto">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 mt-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        <div className="space-y-4">
          <div>
            <span className="inline font-medium mr-2">Name:</span>
            <span>{user.name}</span>
          </div>
          <div>
            <span className="inline font-medium mr-2">Role:</span>
            <span>{user.role}</span>
          </div>
          <div>
            <span className="inline font-medium mr-2">Photo:</span>
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full mt-2"
              />
            ) : (
              <span>No photo</span>
            )}
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Link href="/private/updateProfile">
              Edit Profile
            </Link>
          </button>
        </div>
    </div>
  );
}