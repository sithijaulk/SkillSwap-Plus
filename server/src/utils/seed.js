const User = require('../modules/user/user.model');
const connectDB = require('../config/db');
const config = require('../config');

/**
 * Database Seeder
 * Seeds initial data for testing and development
 */

const seedData = async () => {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Connect to database
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });

        if (existingAdmin) {
            console.log('✅ Admin user already exists');
            console.log(`   Email: ${existingAdmin.email}\n`);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            firstName: 'System',
            lastName: 'Administrator',
            email: 'admin@skillswap.edu',
            password: 'Admin@123',
            role: 'admin',
            isActive: true,
            isVerified: true,
            university: 'SkillSwap University',
            bio: 'System administrator for SkillSwap+ platform'
        });

        console.log('✅ Admin user created successfully');
        console.log('   Email: admin@skillswap.edu');
        console.log('   Password: Admin@123');
        console.log('   ⚠️  Remember to change the password after first login!\n');

        // Optional: Create sample mentor
        const sampleMentor = await User.create({
            firstName: 'John',
            lastName: 'Mentor',
            email: 'mentor@example.com',
            password: 'Password123',
            role: 'mentor',
            isActive: true,
            isVerified: true,
            university: 'SkillSwap University',
            department: 'Computer Science',
            yearOfStudy: 4,
            bio: 'Experienced programming mentor',
            skills: [
                {
                    name: 'JavaScript',
                    category: 'programming',
                    proficiencyLevel: 'expert',
                    description: 'Full-stack JavaScript development'
                },
                {
                    name: 'Python',
                    category: 'programming',
                    proficiencyLevel: 'advanced',
                    description: 'Python for data science and web development'
                }
            ],
            hourlyRate: 15
        });

        console.log('✅ Sample mentor created');
        console.log('   Email: mentor@example.com');
        console.log('   Password: Password123\n');

        // Optional: Create sample learner
        const sampleLearner = await User.create({
            firstName: 'Jane',
            lastName: 'Student',
            email: 'learner@example.com',
            password: 'Password123',
            role: 'learner',
            isActive: true,
            isVerified: true,
            university: 'SkillSwap University',
            department: 'Computer Science',
            yearOfStudy: 2,
            bio: 'Eager to learn new skills'
        });

        console.log('✅ Sample learner created');
        console.log('   Email: learner@example.com');
        console.log('   Password: Password123\n');

        console.log('🎉 Database seeding completed successfully!\n');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

// Run seeder
seedData();
