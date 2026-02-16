const communityService = require('./community.service');
const { validationResult } = require('express-validator');

/**
 * Community Controller
 * Handles Q&A platform operations
 */

/**
 * @route   POST /api/questions
 * @desc    Create a question
 * @access  Private
 */
exports.createQuestion = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const questionData = {
            ...req.body,
            author: req.user._id
        };

        const question = await communityService.createQuestion(questionData);

        res.status(201).json({
            success: true,
            message: 'Question posted successfully',
            data: question
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/questions
 * @desc    Get all questions with filters
 * @access  Public
 */
exports.getQuestions = async (req, res, next) => {
    try {
        const filters = {
            status: req.query.status,
            subject: req.query.subject,
            tags: req.query.tags,
            search: req.query.search,
            authorId: req.query.authorId
        };

        const options = {
            page: req.query.page,
            limit: req.query.limit,
            sort: req.query.sort
        };

        const result = await communityService.getQuestions(filters, options);

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/questions/:id
 * @desc    Get question by ID
 * @access  Public
 */
exports.getQuestion = async (req, res, next) => {
    try {
        const result = await communityService.getQuestionById(req.params.id, true);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/questions/:id
 * @desc    Update question
 * @access  Private (Author only)
 */
exports.updateQuestion = async (req, res, next) => {
    try {
        const question = await communityService.updateQuestion(
            req.params.id,
            req.user._id.toString(),
            req.body
        );

        res.json({
            success: true,
            message: 'Question updated successfully',
            data: question
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/questions/:id
 * @desc    Delete question
 * @access  Private (Author only)
 */
exports.deleteQuestion = async (req, res, next) => {
    try {
        const result = await communityService.deleteQuestion(
            req.params.id,
            req.user._id.toString()
        );

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/questions/:id/vote
 * @desc    Vote on question
 * @access  Private
 */
exports.voteQuestion = async (req, res, next) => {
    try {
        const { voteType } = req.body;

        const question = await communityService.voteQuestion(
            req.params.id,
            req.user._id.toString(),
            voteType
        );

        res.json({
            success: true,
            message: 'Vote recorded',
            data: question
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/answers
 * @desc    Post an answer
 * @access  Private
 */
exports.createAnswer = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const answerData = {
            ...req.body,
            author: req.user._id
        };

        const answer = await communityService.createAnswer(answerData);

        res.status(201).json({
            success: true,
            message: 'Answer posted successfully',
            data: answer
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/answers/:id
 * @desc    Update answer
 * @access  Private (Author only)
 */
exports.updateAnswer = async (req, res, next) => {
    try {
        const answer = await communityService.updateAnswer(
            req.params.id,
            req.user._id.toString(),
            req.body
        );

        res.json({
            success: true,
            message: 'Answer updated successfully',
            data: answer
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/answers/:id
 * @desc    Delete answer
 * @access  Private (Author only)
 */
exports.deleteAnswer = async (req, res, next) => {
    try {
        const result = await communityService.deleteAnswer(
            req.params.id,
            req.user._id.toString()
        );

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/answers/:id/vote
 * @desc    Vote on answer
 * @access  Private
 */
exports.voteAnswer = async (req, res, next) => {
    try {
        const { voteType } = req.body;

        const answer = await communityService.voteAnswer(
            req.params.id,
            req.user._id.toString(),
            voteType
        );

        res.json({
            success: true,
            message: 'Vote recorded',
            data: answer
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/answers/:id/accept
 * @desc    Accept an answer
 * @access  Private (Question author only)
 */
exports.acceptAnswer = async (req, res, next) => {
    try {
        const answer = await communityService.acceptAnswer(
            req.params.id,
            req.user._id.toString()
        );

        res.json({
            success: true,
            message: 'Answer accepted',
            data: answer
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/answers/:id/comments
 * @desc    Add comment to answer
 * @access  Private
 */
exports.addComment = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        const answer = await communityService.addComment(
            req.params.id,
            req.user._id.toString(),
            text
        );

        res.json({
            success: true,
            message: 'Comment added',
            data: answer
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/community/flag
 * @desc    Flag content
 * @access  Private
 */
exports.flagContent = async (req, res, next) => {
    try {
        const { contentType, contentId, reason } = req.body;

        const content = await communityService.flagContent(
            contentType,
            contentId,
            req.user._id.toString(),
            reason
        );

        res.json({
            success: true,
            message: 'Content flagged for review',
            data: content
        });
    } catch (error) {
        next(error);
    }
};
