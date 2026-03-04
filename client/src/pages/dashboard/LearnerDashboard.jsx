import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';

const LearnerDashboard = () => {
    const [activeTab, setActiveTab] = useState('programs');

    const menuItems = [
        { label: 'Overview', path: '/dashboard/learner', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { label: 'My Programs', path: '/dashboard/learner/programs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { label: 'Payments', path: '/dashboard/learner/payments', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
        { label: 'Profile', path: '/dashboard/learner/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    ];

    return (
        <div className="min-h-screen bg-slate-900 flex">
            <Sidebar menuItems={menuItems} />
            <main className="flex-grow lg:ml-72 pt-32 p-8 overflow-y-auto">
                <div className="container mx-auto">
                    <header className="mb-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Learner Dashboard</h1>
                            <p className="text-slate-500 font-medium">Track your learning journey and upcoming sessions.</p>
                        </div>
                        <div className="glass-morphism rounded-2xl px-6 py-3 flex items-center space-x-3">
                            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Credits</span>
                            <span className="text-2xl font-bold text-indigo-400">250</span>
                        </div>
                    </header>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Joined Programs */}
                        <div className="lg:col-span-3 space-y-8">
                            <div className="glass-morphism rounded-[2.5rem] p-8">
                                <div className="flex items-center space-x-8 border-b border-white/5 mb-8 overflow-x-auto">
                                    {['Joined Programs', 'Session History', 'Pending Requests'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab.toLowerCase())}
                                            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'text-white border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { name: 'Advanced React Patterns', mentor: 'Dr. John', status: 'In Progress', progress: 65 },
                                        { name: 'Node.js Security', mentor: 'Sarah Lee', status: 'Scheduled', progress: 0 },
                                        { name: 'UI/UX Essentials', mentor: 'Michael Tan', status: 'Completed', progress: 100 },
                                    ].map((prog, idx) => (
                                        <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all group">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{prog.name}</h3>
                                                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">Mentor: {prog.mentor}</p>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${prog.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                                    {prog.status}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${prog.progress}%` }}></div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase">{prog.progress}% Completed</span>
                                                <button className="text-xs font-bold text-indigo-400 hover:underline">Launch Session</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Cards */}
                        <div className="space-y-6">
                            <div className="glass-morphism rounded-[2.5rem] p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl -z-10"></div>
                                <h3 className="text-lg font-bold text-white mb-2">Want to Earn?</h3>
                                <p className="text-xs text-slate-500 mb-6 font-medium">Register as a mentor and share your skills with the community.</p>
                                <button className="w-full py-4 premium-gradient rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform text-sm">
                                    Switch to Mentor
                                </button>
                            </div>

                            <div className="glass-morphism rounded-[2.5rem] p-8">
                                <h3 className="text-lg font-bold text-white mb-4">Upcoming</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border-l-4 border-indigo-500">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Today, 4:00 PM</p>
                                        <p className="text-sm font-bold text-white">React Core Deep Dive</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border-l-4 border-slate-700">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Feb 28, 10:00 AM</p>
                                        <p className="text-sm font-bold text-white">Database Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LearnerDashboard;
