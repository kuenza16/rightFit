const express = require('express');
const router = express.Router();
const applyController = require('../controllers/applyController');

// Route to create a new job application
router.post('/create', applyController.uploadPdf, applyController.createApply);
router.get('/', applyController.getAlluser);
router.get('/:id', applyController.getJob)

// Export the router
module.exports = router;
