import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
};

export default Register;
