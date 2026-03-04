const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('./user.controller');
const sessionController = require('./session.controller');
const availabilityController = require('./availability.controller');
const auth = require('../../middleware/auth.middleware');
const { isMentor, isLearner, isLearnerOrMentor } = require('../../middleware/role.middleware');

/**
 * ===========================
 * AUTHENTICATION ROUTES
 * ===========================
 */

// Register
router.post('/auth/register', [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['learner', 'mentor']).withMessage('Invalid role')
], userController.register);

// Login
router.post('/auth/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], userController.login);

// Get current user
router.get('/auth/me', auth, userController.getCurrentUser);

/**
 * ===========================
 * USER ROUTES
 * ===========================
 */

// Get user profile by ID
router.get('/users/profile/:userId', auth, userController.getUserProfile);

// Update own profile
router.put('/users/profile', auth, userController.updateProfile);

// Get all mentors (with filters)
router.get('/users/mentors', auth, userController.getMentors);

// Update mentor skills
router.put('/users/skills', auth, isMentor, userController.updateSkills);

// Get user stats
router.get('/users/stats', auth, userController.getUserStats);

/**
 * ===========================
 * SESSION ROUTES
 * ===========================
 */

// Create session
router.post('/sessions', auth, isLearner, [
    body('mentor').notEmpty().withMessage('Mentor is required'),
    body('skill').trim().notEmpty().withMessage('Skill is required'),
    body('topic').trim().notEmpty().withMessage('Topic is required'),
    body('scheduledDate').isISO8601().withMessage('Valid date is required'),
    body('duration').isInt({ min: 15, max: 240 }).withMessage('Duration must be between 15 and 240 minutes'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number')
], sessionController.createSession);

// Get session by ID
router.get('/sessions/:id', auth, sessionController.getSession);

// Get all sessions (filtered by user)
router.get('/sessions', auth, sessionController.getSessions);

// Update session status
router.put('/sessions/:id/status', auth, isLearnerOrMentor, sessionController.updateStatus);

// Cancel session
router.put('/sessions/:id/cancel', auth, isLearnerOrMentor, sessionController.cancelSession);

// Update payment status
router.put('/sessions/:id/payment', auth, sessionController.updatePayment);

/**
 * ===========================
 * AVAILABILITY ROUTES
 * ===========================
 */

// Create availability
router.post('/availability', auth, isMentor, [
    body('dayOfWeek').isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).withMessage('Invalid day of week'),
    body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid start time format'),
    body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid end time format')
], availabilityController.createAvailability);

// Batch create availability
router.post('/availability/batch', auth, isMentor, availabilityController.batchCreateAvailability);

// Get mentor's availability
router.get('/availability/mentor/:mentorId', availabilityController.getMentorAvailability);

// Get own availability
router.get('/availability/my', auth, isMentor, availabilityController.getMyAvailability);

// Update availability
router.put('/availability/:id', auth, isMentor, availabilityController.updateAvailability);

// Delete availability
router.delete('/availability/:id', auth, isMentor, availabilityController.deleteAvailability);

// Get available slots for date
router.get('/availability/slots/:mentorId/:date', availabilityController.getAvailableSlots);

/**
 * ===========================
 * SKILL ROUTES
 * ===========================
 */
const skillController = require('./skill.controller');
router.post('/skills', auth, isMentor, skillController.createSkill);
router.get('/skills/public', skillController.getSkills);
router.get('/skills/my', auth, isMentor, skillController.getMySkills);

module.exports = router;
