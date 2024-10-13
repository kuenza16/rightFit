const User = require('./../models/jobModel')
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone');
exports.getAllJob = async (req, res, next) => {
    try {
        let users = await User.find();

        res.status(200).json({ data: users, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createJob = async (req, res) => {
    try {
        console.log(req.body)
        // Parse the date string with a specific format and set timezone
        const endDate = moment.tz(req.body.vacancyEndDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Thimphu');
        req.body.vacancyEndDate = new Date(req.body.vacancyEndDate)
        // Calculate days ago from present to end date and ensure it's positive
        const currentTime = moment().tz('Asia/Thimphu');
        const daysAgo = Math.abs(currentTime.diff(endDate, 'days'));
        console.log(daysAgo)
        // Create job vacancy with other data and calculated daysAgo
        const jobData = {
            ...req.body,
            daysAgo: daysAgo
        };

        const createdJob = await User.create(jobData);
        res.status(200).json({ data: createdJob, status: 'success' });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
}

exports.getJob = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateJob = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



// Handle GET request for fetching job listings
exports.getJobListings = (req, res) => {
    // Assuming you're using Mongoose to interact with MongoDB
    JobVacancy.find({}, (err, jobListings) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching job listings' });
        } else {
            // Calculate the days ago for each job listing
            jobListings.forEach(job => {
                const endDate = moment(job.vacancyEndDate);
                const daysAgo = moment().diff(endDate, 'days');
                job.daysAgo = daysAgo;
            });
            res.json(jobListings);
        }
    });
};