import React, { useState, useEffect } from 'react';

const Programs = () => {
    const [skills, setSkills] = useState([
        {
            _id: '1',
            name: 'Full Stack Development',
            mentor: { firstName: 'Dr. John', lastName: 'Doe', university: 'UoM' },
            type: 'Buy Now',
            price: 100,
            description: 'Master React, Node.js and MongoDB with real-world projects.',
            category: 'programming'
        },
        {
            _id: '2',
            name: 'Graphic Design Basics',
            mentor: { firstName: 'Sarah', lastName: 'Lee', university: 'UoK' },
            type: 'Skill Share',
            price: 0,
            description: 'Learn the fundamentals of visual communication and design.',
            category: 'arts'
        }
    ]);

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Available Programs</h1>
                        <p className="text-slate-400">Discover skills shared by university mentors.</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 glass-morphism rounded-xl text-sm font-medium hover:bg-white/5">Filter</button>
                        <button className="px-4 py-2 glass-morphism rounded-xl text-sm font-medium hover:bg-white/5">Sort</button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill) => (
                        <div key={skill._id} className="glass-morphism rounded-3xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-300 flex flex-col">
                            <div className="h-48 bg-slate-800 relative overflow-hidden">
                                <div className="absolute inset-0 premium-gradient opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${skill.type === 'Skill Share' ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                        {skill.type}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                    {skill.description}
                                </p>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold ring-2 ring-white/5">
                                        {skill.mentor.firstName[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white leading-none">{skill.mentor.firstName} {skill.mentor.lastName}</p>
                                        <p className="text-xs text-slate-500 mt-1">{skill.mentor.university}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    {skill.type === 'Buy Now' ? (
                                        <>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider leading-none mb-1">Total Fee</p>
                                            <p className="text-xl font-bold text-white">${(skill.price * 1.25).toFixed(2)}</p>
                                        </>
                                    ) : (
                                        <p className="text-lg font-bold text-green-400 italic">Free</p>
                                    )}
                                </div>
                                <button className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${skill.type === 'Skill Share' ? 'glass-morphism hover:bg-white/5' : 'premium-gradient shadow-lg shadow-indigo-500/20'}`}>
                                    {skill.type === 'Skill Share' ? 'Join Now' : 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Programs;
