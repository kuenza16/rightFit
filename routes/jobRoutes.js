const express = require("express");

const router = express.Router()
const jobController = require('./../controllers/jobController')

router.post('/create', jobController.createJob)

router.get('/', jobController.getAllJob)

router.get('/:id', jobController.getJob)
router.delete('/:id', jobController.deleteJob)

module.exports = router