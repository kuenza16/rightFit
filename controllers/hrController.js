const hr = require('../models/hrModel')
const jwt = require('jsonwebtoken')
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await hr.find()
        res.status(200).json({ data: users, status: 'success' }
        )
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await hr.create(req.body);
        //console.log(req.body.name)
        res.status(200).json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await hr.findById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await hr.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await hr.findByIdAndDelete(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.hrCounts = async (req, res) => {
    try {
        const user = await hr.countDocuments(req.params.id);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}