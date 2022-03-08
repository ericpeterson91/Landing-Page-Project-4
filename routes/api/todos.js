const express = require('express');
const router = express.Router();
const todoCtrl = require('../../controllers/todos');

const {protect} = require('../../config/auth')


router.get('/',  todoCtrl.getTodos)

router.post('/',  todoCtrl.createTodo)

router.delete('/:id',  todoCtrl.deleteTodo)

module.exports = router
