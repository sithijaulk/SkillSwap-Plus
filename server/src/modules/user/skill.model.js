const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String,
        enum: ['programming', 'languages', 'mathematics', 'science', 'arts', 'music', 'sports', 'other'],
        default: 'other'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    type: {
        type: String,
        enum: ['Skill Share', 'Buy Now'],
        required: true
    },
    requiredKnowledge: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
