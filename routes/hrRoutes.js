const express = require("express");

const hrController = require('../controllers/hrController')
const authController = require('./../controllers/authcontrollerHR')
const router = express.Router()



router.post('/create', authController.signup)
router.post("/login", authController.login)

router.get('/', hrController.getAllUsers)
router.get('/count', hrController.hrCounts)

router.patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword,
)
router.patch(
    "/updateMe",
    authController.protect,
    hrController.updateUser
)
router
    .route('/')
    .get(hrController.getAllUsers)
    .post(hrController.createUser)

router
    .route('/:id')
    .get(hrController.getUser)

    .patch(hrController.updateUser)
    .delete(hrController.deleteUser)

module.exports = router