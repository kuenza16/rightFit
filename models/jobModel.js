const mongoose = require('mongoose');
const moment = require('moment');

const jobVacancySchema = new mongoose.Schema({

    jobTitle: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employeeType: {
        type: String,
        required: true
    },
    positionTitle: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    slots: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    placement: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    vacancyEndDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation to check if the value can be parsed as a Date
                return moment(value, 'YYYY/MM/DD', true).isValid();
            },
            message: 'Please provide a valid date in the format DD/MM/YYYY'
        }
    },
    daysAgo: {
        type: Number, // Assuming daysAgo is a number
        required: true
    },
    postedBy: {
        type: String,
        required: true

    }
});

const JobVacancy = mongoose.model('JobVacancy', jobVacancySchema);

module.exports = JobVacancy;
