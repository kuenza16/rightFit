const mongoose = require('mongoose');

// Define the schema for the Apply model
const applySchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Assuming you have a Job model for job details
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for user details
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    parsedData: {
        type: Object, // Assuming parsed data is stored as an object
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Apply model
const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
