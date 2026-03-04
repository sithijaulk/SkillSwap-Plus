import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
                    Unlock Your Potential <br />
                    <span className="text-indigo-400">Through University Collaboration</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Connect with mentors, learn new skills, and share your expertise within the university community.
                    A premium platform built for the next generation of leaders.
                </p>

                <div className="flex items-center justify-center space-x-4">
                    <Link to="/register" className="px-8 py-4 premium-gradient rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform">
                        Get Started
                    </Link>
                    <Link to="/programs" className="px-8 py-4 glass-morphism rounded-2xl font-bold hover:bg-white/5 transition-all">
                        Explore Programs
                    </Link>
                </div>

                {/* Stats Section */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {[
                        { label: 'Learners', value: '5K+' },
                        { label: 'Mentors', value: '1.2K+' },
                        { label: 'Skills', value: '300+' },
                        { label: 'Courses', value: '50+' },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-6 glass-morphism rounded-3xl">
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
