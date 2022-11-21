const { Router } = require('express');
const UserController = require('../controller/UserController');
const CoreUtils = require('../CoreUtils');
const router = Router()

router.get('/', CoreUtils.isAuthorized, UserController.getUser)

router.post('/create', UserController.createUser)

router.post('/login', UserController.loginUser)

module.exports = router