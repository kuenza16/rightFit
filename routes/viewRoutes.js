const express = require('express')
const router = express.Router()
const viewController = require('../controllers/viewController')



router.get('/', viewController.getHome)

router.get('/login', viewController.getSignin)

router.get('/register', viewController.getSignup)

router.get('/admin', viewController.superadmin)

router.get('/hr', viewController.hrhome)

router.get('/postjob', viewController.postjob)

router.get('/detail', viewController.details)

router.get('/joblist', viewController.joblist)

router.get("/result", viewController.result)

router.get("/userDetail", viewController.userDetails)

router.get("/admin_user", viewController.adminUsers)

router.get("/admin_hr", viewController.adminHr)
router.get("/me", viewController.profile)

module.exports = router