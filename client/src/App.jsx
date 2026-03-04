import React from 'react';
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
