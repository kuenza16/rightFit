const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post("/login", authController.login)
router.get("/logout", authController.logout)

router.get('/', userController.getAllUsers)
router.get('/count', userController.userCount)
router.patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword,
)
router.patch(
    "/updateMe",
    authController.protect,

    userController.updateUser
)



router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router