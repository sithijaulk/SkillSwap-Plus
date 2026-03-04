import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Community = () => {
    const [posts, setPosts] = useState([
        {
            _id: '1',
            author: 'Alex J.',
            role: 'Learner',
            content: 'Anyone interested in a study group for Advanced Algorithms this weekend? 📚',
            likes: 12,
            comments: 4,
            timestamp: '2 hours ago'
        },
        {
            _id: '2',
            author: 'Dr. Smith',
            role: 'Mentor',
            content: "I've just uploaded new resources for the Backend Mastery program. Check them out! 🚀",
            likes: 24,
            comments: 8,
            timestamp: '5 hours ago'
        }
    ]);

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Community Hub</h1>
                    <p className="text-slate-400">Collaborate and discuss with your fellow university members.</p>
                </div>

                {/* Post Creator */}
                <div className="glass-morphism rounded-3xl p-6 mb-10">
                    <textarea
                        className="w-full bg-slate-800/30 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-slate-600 resize-none h-24"
                        placeholder="Share what's on your mind..."
                    ></textarea>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-2">
                            <button className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </button>
                        </div>
                        <button className="px-6 py-2.5 premium-gradient rounded-xl font-bold shadow-lg shadow-indigo-500/10 hover:scale-105 transition-transform">
                            Post Content
                        </button>
                    </div>
                </div>

                {/* Post Feed */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post._id} className="glass-morphism rounded-3xl p-6 hover:border-white/10 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center font-bold text-indigo-400">
                                        {post.author[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold leading-none">{post.author}</h4>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1 block">
                                            {post.role}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-500 font-medium">{post.timestamp}</span>
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-6">
                                {post.content}
                            </p>

                            <div className="flex items-center space-x-6 border-t border-white/5 pt-4">
                                <button className="flex items-center space-x-2 text-slate-400 hover:text-indigo-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    <span className="text-sm font-bold">{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-2 text-slate-400 hover:text-indigo-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    <span className="text-sm font-bold">{post.comments}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Community;
