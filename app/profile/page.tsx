"use client";
import { useSelector } from 'react-redux';

export default function ProfilePage() {
    const user = useSelector((state: any) => state.auth.user);
    console.log('User data:', user); // Debugging line to check user data

    return (
        <div className="bg-gray-100 p-8 mt-4 rounded-lg shadow-md max-w-md mx-auto">
            <h2>My Profile</h2>
            {user ? (
                <div>
                    <p className="mb-4">
                        <strong>ID:</strong> {user.id}
                    </p>
                    <p className="mb-4">
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p className="mb-4">
                        <strong>Role:</strong> {user.role}
                    </p>
                    <p className="mb-4">
                        <strong>Photo:</strong> {user.photoUrl ? <img src={user.photoUrl} alt="Profile" className="w-20 h-20 rounded-full inline-block" /> : 'N/A'}
                    </p>
                </div>
            ) : (
                <p className="text-red-500">No user information available. Please sign in.</p>
            )}
        </div>
    );
}