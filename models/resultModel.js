const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobVacancy', // Reference to the Job model
        required: [true, 'A jobid is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'A username is required'],
    },
    pdf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apply', // Reference to the User model
        required: [true, 'A username is required'],
    },
    relevence_score: {
        type: String,
    },
    Ai_Commment: {
        type: String,
        required: true
    },


    publishedAt: {
        type: Date,
        default: Date.now(),
    }


})
const Result = mongoose.model('result', resultSchema);

module.exports = Result;
