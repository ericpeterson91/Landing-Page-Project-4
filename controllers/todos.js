const Todo = require('../models/Todo');
const User = require('../models/User')

module.exports = {
    getTodos,
    createTodo,
    deleteTodo
}

async function getTodos(req, res) {
  try {
    await Todo.find({user: req.user._id}).sort({createdAt:'desc'}).exec();// 1. grab all items from DB
    res.status(200).json(todos)        
  } catch(err) {
    res.status(400).json(err);
  }
}

async function createTodo(req, res) {
  try {
    await Todo.create({text: req.body.text, user: req.user._id})
    res.status(201).json('ok')           
  } catch(err) {
    res.status(400).json(err);
  }
}




async function deleteTodo(req, res) {
    try {
      const user = await User.findById(req.user.id)
      const todo = await Todo.findById(req.params.id)
      
      if (!user) {
        res.status(401)
        throw new Error('User not found')
      }

      if (todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
      

      await Todo.findByIdAndDelete(req.params.id)
      res.status(200).json('ok')            
    } catch(err) {
      res.status(400).json(err);
    }
  }

