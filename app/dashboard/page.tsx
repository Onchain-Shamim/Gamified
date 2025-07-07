"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const PrivateDashboard = () => {
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!auth?.user) {
      router.replace("/signIn"); // Use replace to avoid back navigation to dashboard
    }
  }, [auth?.user, router]);

  if (!auth?.user) {
    // Directly render nothing, the router will show the sign in page
    return null;
  }

  return (
    <div className="bg-gray-100 p-8 mt-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Private Dashboard</h2>
      <p className="mb-4">This is a private dashboard accessible only to authenticated users.</p>
      <p className="text-gray-600">You can add more features here as needed.</p>
    </div>
  );
};

export default PrivateDashboard;