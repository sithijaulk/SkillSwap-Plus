const Skill = require('./skill.model');
const User = require('./user.model');

// Create a new skill
exports.createSkill = async (req, res) => {
    try {
        const { name, description, category, price, type, requiredKnowledge } = req.body;

        const skill = await Skill.create({
            mentor: req.user.userId,
            name,
            description,
            category,
            price,
            type,
            requiredKnowledge
        });

        res.status(201).json({
            success: true,
            data: skill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all skills (public)
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ isActive: true }).populate('mentor', 'firstName lastName university');

        // Apply 25% platform fee markup for display
        const displaySkills = skills.map(skill => {
            const skillObj = skill.toObject();
            if (skill.type === 'Buy Now') {
                skillObj.displayPrice = skill.price * 1.25;
            }
            return skillObj;
        });

        res.status(200).json({
            success: true,
            data: displaySkills
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get mentor's own skills
exports.getMySkills = async (req, res) => {
    try {
        const skills = await Skill.find({ mentor: req.user.userId });
        res.status(200).json({
            success: true,
            data: skills
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
