import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

// Public Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Community from './pages/Community';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Components
import MentorDashboard from './pages/dashboard/MentorDashboard';
import LearnerDashboard from './pages/dashboard/LearnerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-900">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Dashboards */}
                    <Route path="/dashboard/learner" element={<LearnerDashboard />} />
                    <Route path="/dashboard/mentor" element={<MentorDashboard />} />
                    <Route path="/dashboard/admin" element={<AdminDashboard />} />

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import Skills from './pages/Skills';
import MentorSkills from './pages/mentor/MentorSkills';

// Learner Pages
import LearnerDashboard from './pages/dashboard/LearnerDashboard';

// Mentor Pages
import MentorDashboard from './pages/dashboard/MentorDashboard';

// Admin Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Placeholder Pages (to be built)
const MentorsPage = () => <div className="min-h-screen p-4">Mentors page coming soon...</div>;
const MySessions = () => <div className="min-h-screen p-4">My Sessions page coming soon...</div>;
const BookSession = () => <div className="min-h-screen p-4">Book Session page coming soon...</div>;
const UserProfile = () => <div className="min-h-screen p-4">Profile page coming soon...</div>;
const CommunityPage = () => <div className="min-h-screen p-4">Community page coming soon...</div>;

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={!isAuthenticated ? <Login /> : <Navigate to="/learner/dashboard" />} />
        <Route path="/auth/register" element={!isAuthenticated ? <Register /> : <Navigate to="/learner/dashboard" />} />

        {/* Learner Routes */}
        <Route
          path="/learner/dashboard"
          element={
            <ProtectedRoute allowedRoles={['learner']}>
              <LearnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <ProtectedRoute allowedRoles={['learner']}>
              <MentorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute allowedRoles={['learner']}>
              <MySessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-session"
          element={
            <ProtectedRoute allowedRoles={['learner']}>
              <BookSession />
            </ProtectedRoute>
          }
        />

        {/* Mentor Routes */}
        <Route
          path="/mentor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/skills" element={<Skills />} />

        <Route
          path="/mentor/skills"
          element={
            <ProtectedRoute allowedRoles={["mentor"]}>
              <MentorSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <CommunityPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;

>>>>>>> 1129752f430480f1b93703b0bd3b58554d88858c
