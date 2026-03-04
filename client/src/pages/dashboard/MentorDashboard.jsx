import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';

const MentorDashboard = () => {
    const [stats] = useState([
        { label: 'Total Earnings', value: '$1,250.00', sub: 'After 25% fee', color: 'indigo' },
        { label: 'Active Skills', value: '12', sub: '4 Buy Now, 8 Share', color: 'purple' },
        { label: 'Pending Payouts', value: '$450.00', sub: 'Ready in 2 days', color: 'pink' },
        { label: 'Avg. Rating', value: '4.9', sub: '120 Reviews', color: 'orange' },
    ]);

    const menuItems = [
        { label: 'Overview', path: '/dashboard/mentor', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { label: 'Programs', path: '/dashboard/mentor/programs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { label: 'Incomes', path: '/dashboard/mentor/incomes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { label: 'Profile Settings', path: '/dashboard/mentor/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    ];

    return (
        <div className="min-h-screen bg-slate-900 flex">
            <Sidebar menuItems={menuItems} />

            <main className="flex-grow lg:ml-72 pt-32 p-8 overflow-y-auto">
                <div className="container mx-auto">
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Mentor Dashboard</h1>
                        <p className="text-slate-500 font-medium">Welcome back, Professor! Here's what's happening today.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="glass-morphism rounded-3xl p-6 relative overflow-hidden group">
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 blur-3xl -z-10 group-hover:bg-${stat.color}-500/20 transition-all`}></div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-[10px] text-slate-400 font-medium uppercase">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Bookings */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="glass-morphism rounded-[2.5rem] p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold text-white">Recent Skill Bookings</h2>
                                    <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300">View All</button>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { user: 'Emily Watson', skill: 'React & Redux', date: 'Tomorrow, 10:00 AM', amount: '$45.00', status: 'Upcoming' },
                                        { user: 'Liam Neeson', skill: 'Python UI', date: 'Yesterday, 02:00 PM', amount: '$35.00', status: 'Completed' },
                                        { user: 'Sophia Loren', skill: 'Algorithm 101', date: 'Mar 01, 09:00 AM', amount: '$0.00', status: 'Requested' },
                                    ].map((booking, idx) => (
                                        <div key={idx} className="p-5 bg-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all border border-transparent hover:border-white/5">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                                                    {booking.user[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{booking.user}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{booking.skill} • {booking.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-bold ${booking.status === 'Completed' ? 'text-green-400' : 'text-indigo-400'}`}>{booking.status}</p>
                                                <p className="text-xs text-slate-500 font-bold mt-1">{booking.amount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-6">
                            <div className="glass-morphism rounded-[2.5rem] p-8">
                                <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full py-4 premium-gradient rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/10 hover:scale-[1.02] transition-all">
                                        Post New Skill
                                    </button>
                                    <button className="w-full py-4 glass-morphism rounded-2xl font-bold text-sm hover:bg-white/5 transition-all text-slate-300">
                                        Update Availability
                                    </button>
                                    <button className="w-full py-4 glass-morphism rounded-2xl font-bold text-sm hover:bg-white/5 transition-all text-slate-300">
                                        Request Payout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MentorDashboard;
