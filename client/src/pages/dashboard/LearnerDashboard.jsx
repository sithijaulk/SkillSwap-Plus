import React from 'react';
import { useAuth } from '../../context/AuthContext';

const LearnerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SkillSwap+ - Learner Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user?.firstName}!</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
