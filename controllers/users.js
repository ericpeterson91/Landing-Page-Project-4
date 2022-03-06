const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register,
  loginUser,
  getData,
};

const SALT_ROUNDS = 6;

async function register(req, res) {
  try {
    //check if user exists
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400).json(err)
    }
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const user = await User.create({name: req.body.name,
         email:req.body.email,
          password:hashedPassword
        });
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.json(token); // send it to the frontend    
    
  } catch (err) {
    console.log("user creation error", err)
    res.status(400).json(err);
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.json(token); // send it to the frontend

  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

async function getData(req, res) {
  try {
    console.log("hi");
  } catch (err) {
    res.status(400).json(err);
  }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

