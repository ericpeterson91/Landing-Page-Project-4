const express = require('express');
const router = express.Router();
const goalCtrl = require('../../controllers/goals');



router.get('/',  goalCtrl.getGoals)

router.post('/',  goalCtrl.createGoal)

router.delete('/:id/:userid',  goalCtrl.deleteGoal)

module.exports = router