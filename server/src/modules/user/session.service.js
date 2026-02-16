const Session = require('./session.model');
const User = require('./user.model');
const Availability = require('./availability.model');
const Progress = require('./progress.model');

/**
 * Session Service Layer
 * Contains business logic for session management
 */

class SessionService {
    /**
     * Create a new session
     */
    async createSession(sessionData) {
        // Validate mentor exists and is verified
        const mentor = await User.findById(sessionData.mentor);
        if (!mentor || mentor.role !== 'mentor') {
            throw new Error('Invalid mentor');
        }

        if (!mentor.isVerified) {
            throw new Error('Mentor is not verified yet');
        }

        // Create session
        const session = new Session(sessionData);
        await session.save();

        // Populate references
        await session.populate('learner mentor', '-password');

        return session;
    }

    /**
     * Get session by ID
     */
    async getSessionById(sessionId) {
        const session = await Session.findById(sessionId)
            .populate('learner mentor', '-password')
            .populate('cancelledBy', 'firstName lastName');

        if (!session) {
            throw new Error('Session not found');
        }

        return session;
    }

    /**
     * Get sessions with filters
     */
    async getSessions(filters = {}) {
        const query = {};

        // Filter by learner or mentor
        if (filters.learnerId) {
            query.learner = filters.learnerId;
        }
        if (filters.mentorId) {
            query.mentor = filters.mentorId;
        }

        // Filter by status
        if (filters.status) {
            query.status = filters.status;
        }

        // Filter by date range
        if (filters.startDate || filters.endDate) {
            query.scheduledDate = {};
            if (filters.startDate) {
                query.scheduledDate.$gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                query.scheduledDate.$lte = new Date(filters.endDate);
            }
        }

        const sessions = await Session.find(query)
            .populate('learner mentor', '-password')
            .sort({ scheduledDate: -1 });

        return sessions;
    }

    /**
     * Update session status
     */
    async updateSessionStatus(sessionId, status, userId) {
        const session = await Session.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        // Verify user is part of the session
        const isLearner = session.learner.toString() === userId;
        const isMentor = session.mentor.toString() === userId;

        if (!isLearner && !isMentor) {
            throw new Error('Unauthorized to update this session');
        }

        // Update status
        session.status = status;

        // Set completion time if completed
        if (status === 'completed') {
            session.completedAt = new Date();

            // Update mentor's total sessions
            await User.findByIdAndUpdate(session.mentor, { $inc: { totalSessions: 1 } });

            // Update learner's progress
            await this.updateLearnerProgress(session.learner, session.skill, session.duration);
        }

        await session.save();
        await session.populate('learner mentor', '-password');

        return session;
    }

    /**
     * Cancel session
     */
    async cancelSession(sessionId, userId, reason) {
        const session = await Session.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        // Verify user is part of the session
        const isLearner = session.learner.toString() === userId;
        const isMentor = session.mentor.toString() === userId;

        if (!isLearner && !isMentor) {
            throw new Error('Unauthorized to cancel this session');
        }

        // Cannot cancel if already completed or cancelled
        if (['completed', 'cancelled'].includes(session.status)) {
            throw new Error(`Cannot cancel a ${session.status} session`);
        }

        session.status = 'cancelled';
        session.cancelledAt = new Date();
        session.cancelledBy = userId;
        session.cancellationReason = reason;

        // Handle payment refund (mock)
        if (session.paymentStatus === 'paid') {
            session.paymentStatus = 'refunded';
        }

        await session.save();
        await session.populate('learner mentor cancelledBy', '-password');

        return session;
    }

    /**
     * Update session payment status (mock)
     */
    async updatePaymentStatus(sessionId, paymentData) {
        const session = await Session.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        session.paymentStatus = paymentData.status;
        session.transactionId = paymentData.transactionId || `TEST_${Date.now()}`;

        // Confirm session if payment is successful
        if (paymentData.status === 'paid' && session.status === 'pending') {
            session.status = 'confirmed';
        }

        await session.save();
        return session;
    }

    /**
     * Helper: Update learner progress
     */
    async updateLearnerProgress(learnerId, skill, durationMinutes) {
        let progress = await Progress.findOne({ learner: learnerId, skill });

        if (!progress) {
            progress = new Progress({
                learner: learnerId,
                skill,
                totalSessionsAttended: 1,
                totalHoursLearned: durationMinutes / 60,
                lastSessionDate: new Date()
            });
        } else {
            progress.totalSessionsAttended += 1;
            progress.totalHoursLearned += durationMinutes / 60;
            progress.lastSessionDate = new Date();

            // Auto-progress level based on hours
            if (progress.totalHoursLearned >= 50) {
                progress.currentLevel = 'expert';
            } else if (progress.totalHoursLearned >= 30) {
                progress.currentLevel = 'advanced';
            } else if (progress.totalHoursLearned >= 15) {
                progress.currentLevel = 'intermediate';
            } else if (progress.totalHoursLearned >= 5) {
                progress.currentLevel = 'elementary';
            }
        }

        await progress.save();
        return progress;
    }
}

module.exports = new SessionService();
