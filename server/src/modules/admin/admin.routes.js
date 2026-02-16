const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminController = require('./admin.controller');
const auth = require('../../middleware/auth.middleware');
const { isAdmin } = require('../../middleware/role.middleware');

/**
 * ===========================
 * USER MANAGEMENT ROUTES
 * ===========================
 */

// Get all users
router.get('/users', auth, isAdmin, adminController.getAllUsers);

// Verify mentor
router.put('/verify-mentor/:userId', auth, isAdmin, adminController.verifyMentor);

// Update user status (suspend/activate)
router.put('/users/:userId/status', auth, isAdmin, [
    body('isActive').isBoolean().withMessage('isActive must be a boolean'),
    body('reason').optional().trim()
], adminController.updateUserStatus);

/**
 * ===========================
 * REPORT ROUTES
 * ===========================
 */

// Create report (available to all authenticated users)
router.post('/reports', auth, [
    body('type').notEmpty().withMessage('Report type is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters')
], adminController.createReport);

// Get all reports
router.get('/reports', auth, isAdmin, adminController.getReports);

// Get report by ID
router.get('/reports/:id', auth, isAdmin, adminController.getReport);

// Assign report
router.put('/reports/:id/assign', auth, isAdmin, adminController.assignReport);

// Update report status
router.put('/reports/:id/status', auth, isAdmin, adminController.updateReportStatus);

// Resolve report
router.put('/reports/:id/resolve', auth, isAdmin, [
    body('resolution').notEmpty().withMessage('Resolution is required'),
    body('details').optional().trim()
], adminController.resolveReport);

// Add communication to report
router.post('/reports/:id/communicate', auth, isAdmin, [
    body('message').trim().notEmpty().withMessage('Message is required')
], adminController.addCommunication);

/**
 * ===========================
 * ANALYTICS ROUTES
 * ===========================
 */

// Get system statistics
router.get('/stats', auth, isAdmin, adminController.getStats);

// Get recent activities
router.get('/activities', auth, isAdmin, adminController.getActivities);

module.exports = router;
