const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/users');
const { protect } = require('../../config/auth')

router.post('/', userCtrl.register)
router.post('/login', userCtrl.loginUser)
router.get('/getData', userCtrl.getData)


module.exports = router
