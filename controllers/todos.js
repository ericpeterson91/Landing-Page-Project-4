const Todo = require('../models/Todo');
const User = require('../models/User')

module.exports = {
    getTodos,
    createTodo,
    deleteTodo
}

async function getTodos(req, res) {
  try {
    let todos = await Todo.find({ user: req.user._id}).exec()
    console.log(todos)
    res.status(200).json(todos)        
  } catch(err) {
    res.status(401).json(err);
  }
}

async function createTodo(req, res) {
  try {
    const todo = await Todo.create({text: req.body.text, user: req.user._id})
    res.status(200).json(todo)           
  } catch(err) {
    res.status(400).json(err);
  }
}




async function deleteTodo(req, res) {
  console.log(req.params)  
  try {
      const user = await User.findById(req.params.userid)
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
      console.log(err)
      res.status(400).json(err);
    }
  }

