const express = require('express');
const router = express.Router();
const todoCtrl = require('../../controllers/todos');



router.get('/',  todoCtrl.getTodos)

router.post('/',  todoCtrl.createTodo)

router.delete('/:id/:userid',  todoCtrl.deleteTodo)

module.exports = router
