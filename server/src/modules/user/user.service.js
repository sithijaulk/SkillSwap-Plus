const User = require('./user.model');
const Session = require('./session.model');
const Availability = require('./availability.model');
const Progress = require('./progress.model');

/**
 * User Service Layer
 * Contains all business logic for user operations
 */

class UserService {
    /**
     * Register a new user
     */
    async registerUser(userData) {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Create new user
        const user = new User(userData);
        await user.save();

        // Generate token
        const token = user.generateAuthToken();

        return {
            user: user.getPublicProfile(),
            token
        };
    }

    /**
     * Login user
     */
    async loginUser(email, password) {
        // Find user with password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new Error('Account is deactivated. Please contact support.');
        }

        // Generate token
        const token = user.generateAuthToken();

        return {
            user: user.getPublicProfile(),
            token
        };
    }

    /**
     * Get user profile by ID
     */
    async getUserProfile(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    /**
     * Update user profile
     */
    async updateUserProfile(userId, updateData) {
        // Remove fields that shouldn't be updated directly
        delete updateData.password;
        delete updateData.role;
        delete updateData.email;
        delete updateData.totalSessions;
        delete updateData.averageRating;
        delete updateData.totalRatings;
        delete updateData.reputationScore;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    /**
     * Get all mentors with optional filters
     */
    async getMentors(filters = {}) {
        const query = { role: 'mentor', isActive: true };

        // Filter by skill
        if (filters.skill) {
            query['skills.name'] = { $regex: filters.skill, $options: 'i' };
        }

        // Filter by category
        if (filters.category) {
            query['skills.category'] = filters.category;
        }

        // Filter by minimum rating
        if (filters.minRating) {
            query.averageRating = { $gte: parseFloat(filters.minRating) };
        }

        const mentors = await User.find(query)
            .select('-password')
            .sort({ averageRating: -1, totalSessions: -1 });

        return mentors;
    }

    /**
     * Add or update mentor skills
     */
    async updateMentorSkills(userId, skills) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== 'mentor') {
            throw new Error('Only mentors can add skills');
        }

        user.skills = skills;
        await user.save();

        return user;
    }

    /**
     * Get user statistics
     */
    async getUserStats(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const stats = {
            totalSessions: user.totalSessions,
            averageRating: user.averageRating,
            totalRatings: user.totalRatings,
            reputationScore: user.reputationScore
        };

        // Get session counts by status
        const sessionStats = await Session.aggregate([
            { $match: { [user.role === 'mentor' ? 'mentor' : 'learner']: user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        stats.sessionsByStatus = sessionStats;

        return stats;
    }
}

module.exports = new UserService();
