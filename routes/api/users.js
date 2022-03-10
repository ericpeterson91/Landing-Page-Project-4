const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/users');


router.post('/signup', userCtrl.register)
router.post('/login', userCtrl.loginUser)


module.exports = router
