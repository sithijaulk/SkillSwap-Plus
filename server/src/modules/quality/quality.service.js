const Rating = require('./rating.model');
const Feedback = require('./feedback.model');
const ImprovementRecommendation = require('./improvement.model');
const User = require('../user/user.model');
const Session = require('../user/session.model');

/**
 * Quality Service Layer
 * Business logic for ratings, feedback, and improvement recommendations
 */

class QualityService {
    /**
     * Submit a rating for a session
     */
    async submitRating(ratingData) {
        const { session: sessionId, rater } = ratingData;

        // Verify session exists and is completed
        const session = await Session.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        if (session.status !== 'completed') {
            throw new Error('Can only rate completed sessions');
        }

        // Check if rating already exists
        const existingRating = await Rating.findOne({ session: sessionId });
        if (existingRating) {
            throw new Error('Session already rated');
        }

        // Determine ratee
        const isLearner = session.learner.toString() === rater.toString();
        const ratee = isLearner ? session.mentor : session.learner;

        // Create rating
        const rating = new Rating({
            ...ratingData,
            ratee
        });
        await rating.save();

        await rating.populate('rater ratee session', '-password');

        // Update user's average rating
        await this.updateUserRating(ratee);

        // Generate improvement recommendations if rating is low
        if (ratingData.overallRating < 3) {
            await this.generateImprovementRecommendations(ratee, rating);
        }

        return rating;
    }

    /**
     * Get ratings for a user (mentor)
     */
    async getUserRatings(userId, filters = {}) {
        const query = { ratee: userId, isPublic: true };

        if (filters.minRating) {
            query.overallRating = { $gte: parseFloat(filters.minRating) };
        }

        const ratings = await Rating.find(query)
            .populate('rater', 'firstName lastName')
            .populate('session', 'skill topic scheduledDate')
            .sort({ createdAt: -1 });

        return ratings;
    }

    /**
     * Submit feedback
     */
    async submitFeedback(feedbackData) {
        const { session: sessionId, provider } = feedbackData;

        // Verify session
        const session = await Session.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        // Determine receiver and type
        const isLearner = session.learner.toString() === provider.toString();
        const receiver = isLearner ? session.mentor : session.learner;
        const type = isLearner ? 'learner-to-mentor' : 'mentor-to-learner';

        const feedback = new Feedback({
            ...feedbackData,
            receiver,
            type
        });

        await feedback.save();
        await feedback.populate('provider receiver session', '-password');

        // Analyze feedback for patterns
        await this.analyzeFeedbackPatterns(receiver);

        return feedback;
    }

    /**
     * Get feedback for a user
     */
    async getUserFeedback(userId, filters = {}) {
        const query = { receiver: userId };

        if (filters.type) {
            query.type = filters.type;
        }

        if (filters.isPrivate !== undefined) {
            query.isPrivate = filters.isPrivate === 'true';
        }

        const feedback = await Feedback.find(query)
            .populate('provider', 'firstName lastName')
            .populate('session', 'skill topic')
            .sort({ createdAt: -1 });

        return feedback;
    }

    /**
     * Acknowledge feedback
     */
    async acknowledgeFeedback(feedbackId, userId) {
        const feedback = await Feedback.findOne({
            _id: feedbackId,
            receiver: userId
        }); if (!feedback) {
            throw new Error('Feedback not found');
        }

        feedback.isAcknowledged = true;
        feedback.acknowledgedAt = new Date();
        await feedback.save();

        return feedback;
    }

    /**
     * Get improvement recommendations for user
     */
    async getImprovementRecommendations(userId, status = null) {
        const query = { user: userId, isDismissed: false };

        if (status) {
            query.status = status;
        }

        const recommendations = await ImprovementRecommendation.find(query)
            .sort({ priority: -1, createdAt: -1 });

        return recommendations;
    }

    /**
     * Update improvement recommendation status
     */
    async updateImprovementStatus(recommendationId, userId, status, notes = null) {
        const recommendation = await ImprovementRecommendation.findOne({
            _id: recommendationId,
            user: userId
        });

        if (!recommendation) {
            throw new Error('Recommendation not found');
        }

        recommendation.status = status;

        if (notes) {
            recommendation.userNotes = notes;
        }

        if (status === 'in-progress' && !recommendation.startedAt) {
            recommendation.startedAt = new Date();
        }

        if (status === 'completed') {
            recommendation.completedAt = new Date();
        }

        await recommendation.save();
        return recommendation;
    }

    /**
     * Calculate and return reputation metrics
     */
    async calculateReputation(userId) {
        const user = await User.findById(userId);
        if (!user || user.role !== 'mentor') {
            throw new Error('Only mentors have reputation metrics');
        }

        // Get ratings
        const ratings = await Rating.find({ ratee: userId });

        // Calculate metrics
        const metrics = {
            totalRatings: ratings.length,
            averageRating: user.averageRating,
            totalSessions: user.totalSessions,

            // Detailed rating breakdowns
            ratingDistribution: {
                5: ratings.filter(r => r.overallRating === 5).length,
                4: ratings.filter(r => r.overallRating === 4).length,
                3: ratings.filter(r => r.overallRating === 3).length,
                2: ratings.filter(r => r.overallRating === 2).length,
                1: ratings.filter(r => r.overallRating === 1).length,
            },

            // Recommendation rate
            recommendationRate: ratings.filter(r => r.wouldRecommend).length / (ratings.length || 1) * 100,

            // Reputation score (weighted)
            reputationScore: this.calculateReputationScore(user, ratings)
        };

        // Update user reputation score
        user.reputationScore = metrics.reputationScore;
        await user.save();

        return metrics;
    }

    /**
     * Helper: Update user's average rating
     */
    async updateUserRating(userId) {
        const ratings = await Rating.find({ ratee: userId });

        if (ratings.length === 0) return;

        const totalRating = ratings.reduce((sum, r) => sum + r.overallRating, 0);
        const averageRating = totalRating / ratings.length;

        await User.findByIdAndUpdate(userId, {
            averageRating: Math.round(averageRating * 10) / 10,
            totalRatings: ratings.length
        });
    }

    /**
     * Helper: Generate improvement recommendations based on low ratings
     */
    async generateImprovementRecommendations(userId, rating) {
        const recommendations = [];

        // Low knowledge rating
        if (rating.knowledgeRating && rating.knowledgeRating < 3) {
            recommendations.push({
                user: userId,
                type: 'skill',
                title: 'Enhance Subject Knowledge',
                description: 'Consider reviewing fundamental concepts and staying updated with latest developments in your teaching areas.',
                priority: 'high',
                source: 'automated',
                triggerMetrics: {
                    averageRating: rating.knowledgeRating
                }
            });
        }

        // Low communication rating
        if (rating.communicationRating && rating.communicationRating < 3) {
            recommendations.push({
                user: userId,
                type: 'communication',
                title: 'Improve Communication Skills',
                description: 'Focus on clear explanations, active listening, and checking for student understanding regularly.',
                priority: 'high',
                source: 'automated',
                triggerMetrics: {
                    averageRating: rating.communicationRating
                }
            });
        }

        // Create recommendations
        if (recommendations.length > 0) {
            await ImprovementRecommendation.insertMany(recommendations);
        }
    }

    /**
     * Helper: Analyze feedback patterns
     */
    async analyzeFeedbackPatterns(userId) {
        const recentFeedback = await Feedback.find({
            receiver: userId
        }).limit(10).sort({ createdAt: -1 });

        // Identify common improvement areas
        const improvementAreas = recentFeedback.flatMap(f => f.areasForImprovement);
        const commonIssues = this.findCommonPatterns(improvementAreas);

        // If pattern detected, create recommendation
        if (commonIssues.length > 0) {
            const existing = await ImprovementRecommendation.findOne({
                user: userId,
                type: 'feedback-analysis',
                status: { $in: ['pending', 'in-progress'] }
            });

            if (!existing) {
                await ImprovementRecommendation.create({
                    user: userId,
                    type: 'general',
                    title: 'Address Common Feedback Themes',
                    description: `Multiple students have mentioned similar areas: ${commonIssues.join(', ')}`,
                    priority: 'medium',
                    source: 'feedback-analysis',
                    triggerMetrics: {
                        totalFeedbacks: recentFeedback.length,
                        commonIssues
                    }
                });
            }
        }
    }

    /**
     * Helper: Calculate reputation score
     */
    calculateReputationScore(user, ratings) {
        const avgRating = user.averageRating || 0;
        const sessions = user.totalSessions || 0;
        const ratingCount = ratings.length || 0;

        // Weighted formula
        const score = (
            (avgRating * 20) +  // Max 100 points from average rating
            Math.min(sessions * 2, 100) +  // Max 100 points from sessions
            Math.min(ratingCount * 5, 100)  // Max 100 points from rating count
        ) / 3;

        return Math.round(score * 10) / 10;
    }

    /**
     * Helper: Find common patterns in feedback
     */
    findCommonPatterns(items) {
        const frequency = {};
        items.forEach(item => {
            const normalized = item.toLowerCase().trim();
            frequency[normalized] = (frequency[normalized] || 0) + 1;
        });

        return Object.entries(frequency)
            .filter(([_, count]) => count >= 2)
            .map(([item, _]) => item);
    }
}

module.exports = new QualityService();
