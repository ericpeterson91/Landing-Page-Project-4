const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/users');

router.post('/', userCtrl.register)
router.post('/login', userCtrl.register)
router.get('/getData', userCtrl.register)


module.exports = router
