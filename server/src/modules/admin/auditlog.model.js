const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    // Admin performing action
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Admin is required']
    },

    // Action details
    action: {
        type: String,
        required: [true, 'Action is required'],
        enum: [
            'user-verified',
            'user-suspended',
            'user-activated',
            'user-deleted',
            'mentor-verified',
            'mentor-rejected',
            'content-removed',
            'content-flagged',
            'dispute-created',
            'dispute-resolved',
            'report-assigned',
            'report-resolved',
            'settings-updated',
            'user-role-changed',
            'session-cancelled',
            'payment-refunded',
            'warning-issued',
            'ban-issued'
        ]
    },

    // Resource being acted upon
    resource: {
        type: String,
        required: [true, 'Resource type is required'],
        enum: ['user', 'session', 'report', 'content', 'dispute', 'settings', 'payment']
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Resource ID is required']
    },

    // What changed
    changes: {
        before: mongoose.Schema.Types.Mixed,
        after: mongoose.Schema.Types.Mixed
    },

    // Reason for action
    reason: {
        type: String,
        maxlength: 500
    },

    // Additional details
    details: {
        type: String,
        maxlength: 1000
    },

    // IP address for security tracking
    ipAddress: {
        type: String
    },

    // Status
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
    }
}, {
    timestamps: true
});

// Index for efficient queries
auditLogSchema.index({ admin: 1, action: 1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
