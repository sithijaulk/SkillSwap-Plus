const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const communityController = require('./community.controller');
const auth = require('../../middleware/auth.middleware');
const { isLearnerOrMentor } = require('../../middleware/role.middleware');

/**
 * ===========================
 * QUESTION ROUTES
 * ===========================
 */

// Create question
router.post('/questions', auth, isLearnerOrMentor, [
    body('title').trim().isLength({ min: 10, max: 200 }).withMessage('Title must be 10-200 characters'),
    body('body').trim().isLength({ min: 20, max: 2000 }).withMessage('Question must be 20-2000 characters'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('tags').optional().isArray().withMessage('Tags must be an array')
], communityController.createQuestion);

// Get all questions
router.get('/questions', communityController.getQuestions);

// Get question by ID
router.get('/questions/:id', communityController.getQuestion);

// Update question
router.put('/questions/:id', auth, communityController.updateQuestion);

// Delete question
router.delete('/questions/:id', auth, communityController.deleteQuestion);

// Vote on question
router.post('/questions/:id/vote', auth, isLearnerOrMentor, [
    body('voteType').isIn(['upvote', 'downvote', 'remove']).withMessage('Invalid vote type')
], communityController.voteQuestion);

/**
 * ===========================
 * ANSWER ROUTES
 * ===========================
 */

// Create answer
router.post('/answers', auth, isLearnerOrMentor, [
    body('question').notEmpty().withMessage('Question ID is required'),
    body('body').trim().isLength({ min: 20, max: 2000 }).withMessage('Answer must be 20-2000 characters')
], communityController.createAnswer);

// Update answer
router.put('/answers/:id', auth, communityController.updateAnswer);

// Delete answer
router.delete('/answers/:id', auth, communityController.deleteAnswer);

// Vote on answer
router.post('/answers/:id/vote', auth, isLearnerOrMentor, [
    body('voteType').isIn(['upvote', 'downvote', 'remove']).withMessage('Invalid vote type')
], communityController.voteAnswer);

// Accept answer
router.post('/answers/:id/accept', auth, communityController.acceptAnswer);

// Add comment to answer
router.post('/answers/:id/comments', auth, isLearnerOrMentor, [
    body('text').trim().isLength({ min: 1, max: 300 }).withMessage('Comment must be 1-300 characters')
], communityController.addComment);

/**
 * ===========================
 * MODERATION ROUTES
 * ===========================
 */

// Flag content
router.post('/community/flag', auth, [
    body('contentType').isIn(['question', 'answer']).withMessage('Invalid content type'),
    body('contentId').notEmpty().withMessage('Content ID is required'),
    body('reason').trim().notEmpty().withMessage('Reason is required')
], communityController.flagContent);

module.exports = router;
