const Goal = require('../models/Goal');
const User = require('../models/User')

module.exports = {
    getGoals,
    createGoal,
    deleteGoal
}

async function getGoals(req, res) {
  try {
    let goals = await Goal.find({ user: req.user._id}).exec()
    console.log(goals)
    res.status(200).json(goals)        
  } catch(err) {
    res.status(401).json(err);
  }
}

async function createGoal(req, res) {
  try {
    const goal = await Goal.create({text: req.body.text, user: req.user._id})
    res.status(200).json(goal)           
  } catch(err) {
    res.status(400).json(err);
  }
}




async function deleteGoal(req, res) {
  console.log(req.params)  
  try {
      const user = await User.findById(req.params.userid)
      const todo = await Goal.findById(req.params.id)
      
      if (!user) {
        res.status(401)
        throw new Error('User not found')
      }

      if (todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
      

      await Goal.findByIdAndDelete(req.params.id)
      res.status(200).json('ok')            
    } catch(err) {
      console.log(err)
      res.status(400).json(err);
    }
  }

