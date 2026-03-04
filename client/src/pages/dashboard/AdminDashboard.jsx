import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';

const AdminDashboard = () => {
    const [stats] = useState([
        { label: 'Platform Income', value: '$45,200.00', change: '+12%', icon: '💰' },
        { label: 'Total Users', value: '12,500', change: '+5%', icon: '👥' },
        { label: 'Active Reports', value: '14', change: '-2', icon: '⚠️' },
        { label: 'Mentor Payouts', value: '$12,800.00', change: '8 Pending', icon: '💸' },
    ]);

    const menuItems = [
        { label: 'Overview', path: '/dashboard/admin', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { label: 'User Management', path: '/dashboard/admin/users', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
        { label: 'Finance & Payouts', path: '/dashboard/admin/finance', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
        { label: 'Moderation', path: '/dashboard/admin/moderation', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    ];

    return (
        <div className="min-h-screen bg-slate-900 flex">
            <Sidebar menuItems={menuItems} />
            <main className="flex-grow lg:ml-72 pt-32 p-8 overflow-y-auto">
                <div className="container mx-auto">
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Governance</h1>
                        <p className="text-slate-500 font-medium">Manage platform health, finance, and quality control.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="glass-morphism rounded-3xl p-6 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 premium-gradient opacity-5 blur-2xl -z-10 group-hover:opacity-10 transition-opacity"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* User Approval Queue */}
                        <div className="lg:col-span-2 glass-morphism rounded-[2.5rem] p-8">
                            <h2 className="text-xl font-bold text-white mb-8">Pending Mentor Verifications</h2>
                            <div className="space-y-4">
                                {[
                                    { name: 'Dr. Alan Rickman', dept: 'Theoretical Physics', cert: 'Ph.D Verified', date: '2h ago' },
                                    { name: 'Prof. Minerva McGonagall', dept: 'Transfiguration', cert: 'MS Verified', date: '5h ago' },
                                    { name: 'Severus Snape', dept: 'Chemistry', cert: 'Industry Professional', date: '1d ago' },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-4 bg-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/10">
                                                {item.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.name}</p>
                                                <p className="text-xs text-slate-500 font-medium">{item.dept} • <span className="text-indigo-400">{item.cert}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="px-3 py-1.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-lg hover:bg-green-500/30 transition-all uppercase tracking-widest">Approve</button>
                                            <button className="px-3 py-1.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded-lg hover:bg-red-500/30 transition-all uppercase tracking-widest">Decline</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Platform Payouts */}
                        <div className="glass-morphism rounded-[2.5rem] p-8 border-l-4 border-indigo-500">
                            <h2 className="text-xl font-bold text-white mb-6">Finance Actions</h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Total Platform Income</p>
                                    <div className="p-4 bg-white/5 rounded-2xl text-center">
                                        <p className="text-3xl font-bold text-white">$14,250.75</p>
                                        <p className="text-[10px] text-green-400 font-bold uppercase mt-1">Ready for Withdrawal</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Payouts</p>
                                    {[
                                        { mentor: 'Dr. John', amount: '$850.00', status: 'Processed' },
                                        { mentor: 'Sarah Lee', amount: '$1,200.00', status: 'Pending' },
                                    ].map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <span className="text-xs font-bold text-white">{p.mentor}</span>
                                            <span className="text-xs font-bold text-indigo-400">{p.amount}</span>
                                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${p.status === 'Processed' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
