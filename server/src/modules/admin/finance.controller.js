const Transaction = require('./transaction.model');
const Payout = require('./payout.model');
const User = require('../user/user.model');
const Skill = require('../user/skill.model');

// Process a payment (Mock)
exports.processPayment = async (req, res) => {
    try {
        const { skillId } = req.body;
        const skill = await Skill.findById(skillId);

        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }

        const amountPaid = skill.price * 1.25;
        const platformFee = amountPaid * 0.20; // This is actually 25% of the original price, which is 20% of the marked-up price
        // Wait, math: original = 100, markup = 125. Fee = 25. 25/125 = 0.2
        const mentorEarning = amountPaid - platformFee;

        const transaction = await Transaction.create({
            learner: req.user.userId,
            mentor: skill.mentor,
            skill: skillId,
            amountPaid,
            platformFee,
            mentorEarning,
            status: 'completed'
        });

        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get finance stats (Admin)
exports.getFinanceStats = async (req, res) => {
    try {
        const stats = await Transaction.aggregate([
            {
                $group: {
                    _id: null,
                    totalPlatformIncome: { $sum: "$platformFee" },
                    totalMentorEarnings: { $sum: "$mentorEarning" },
                    totalTransactions: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats[0] || { totalPlatformIncome: 0, totalMentorEarnings: 0, totalTransactions: 0 }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
