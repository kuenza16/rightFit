const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Route to create a new result
router.post('/create', resultController.createResult);

module.exports = router;
