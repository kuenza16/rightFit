const Result = require('../models/resultModel');

// Controller function to create a new result
exports.createResult = async (req, res, next) => {
    try {
        const { job, user, pdf, relevance_score, aiComment } = req.body;

        // Create a new result document
        const result = new Result({
            job: job,
            user: user,
            pdf: pdf,
            relevance_score: relevance_score,
            Ai_Comment: aiComment
        });

        // Save the result to the database
        const newResult = await result.save();

        res.status(201).json({ message: 'Result created successfully', data: newResult });
    } catch (error) {
        console.error('Error creating result:', error);
        res.status(500).json({ error: 'Error creating result' });
    }
};
