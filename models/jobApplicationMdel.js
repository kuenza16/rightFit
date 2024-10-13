// JobApplication model
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobVacancy', // Reference to the Job model
        required: true
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'apply', // Reference to the Resume model
        required: true
    },
    // Other fields as needed
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
