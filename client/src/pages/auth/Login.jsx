import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simplified logic for UI flow
        console.log('Login attempt:', formData);
        navigate('/dashboard/learner'); // Default redirect for demo
    };

    return (
        <div className="pt-40 pb-20 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="glass-morphism rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -z-10"></div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-slate-400 font-medium">Log in to your SkillSwap+ account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                placeholder="university@email.edu"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="w-full py-4 premium-gradient rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg">
                            Sign In
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-400 text-sm">
                        Don't have an account? <Link to="/register" className="text-indigo-400 font-bold hover:underline">Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
=======
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/forms/Input';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await login(form.email, form.password);
      // redirect based on role
      let dest = '/dashboard/learner';
      if (user.role === 'mentor') dest = '/dashboard/mentor';
      if (user.role === 'admin') dest = '/dashboard/admin';
      navigate(dest);
    } catch (err) {
      console.error(err);
      // Handle validation errors from backend
      if (err.response?.data?.errors) {
        const errorMsg = err.response.data.errors
          .map(e => e.msg || e.message)
          .join(', ');
        setError(errorMsg);
      } else {
        setError(err.response?.data?.message || err.message || 'Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/auth/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
>>>>>>> 1129752f430480f1b93703b0bd3b58554d88858c
};

export default Login;
