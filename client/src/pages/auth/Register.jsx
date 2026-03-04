import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'learner' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration attempt:', formData);
        navigate('/login');
    };

    return (
        <div className="pt-40 pb-20 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
                <div className="glass-morphism rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 premium-gradient opacity-5 blur-[100px] -z-10"></div>

                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-white mb-2 italic">Join SkillSwap+</h1>
                        <p className="text-slate-400 font-medium">Create your university account and start collaborating.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">First Name</label>
                                <input
                                    type="text" required
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                    placeholder="John"
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Last Name</label>
                                <input
                                    type="text" required
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                    placeholder="Doe"
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Email Address</label>
                            <input
                                type="email" required
                                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                placeholder="university@email.edu"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Account Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['learner', 'mentor'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role })}
                                        className={`py-4 rounded-2xl font-bold border-2 transition-all capitalize ${formData.role === role ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/5 bg-slate-800/30 text-slate-500 hover:border-white/10'}`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Password</label>
                            <input
                                type="password" required
                                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="w-full py-5 premium-gradient rounded-2xl font-bold font-heading shadow-xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-lg mt-4">
                            Create Account
                        </button>
                    </form>

                    <p className="text-center mt-10 text-slate-400 text-sm font-medium">
                        Already a member? <Link to="/login" className="text-indigo-400 font-bold hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
=======
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/forms/Input';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'learner',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await register(form);
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
        setError(err.response?.data?.message || err.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="learner">Learner</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
>>>>>>> 1129752f430480f1b93703b0bd3b58554d88858c
};

export default Register;
