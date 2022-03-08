const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register,
  loginUser,
  getData,
};

// const SALT_ROUNDS = 6;

async function register(req, res) {
  try {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    //check if user exists
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400).json(err)
        throw new Error('user exists already')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    //create user
    const user = await User.create({name,
         email,
          password: hashedPassword
        });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
    // const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    // res.json(token); // send it to the frontend    
    
  } catch (err) {
    console.log("user creation error", err)
    res.status(400).json(err);
  }
}

async function loginUser(req, res) {
  try {

    const {email, password} = req.body

    const user = await User.findOne({ email});

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }

      )
    } else {
      res.status(400)
      throw new Error('invalid credentials')
    }
    // if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

    // const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    // res.json(token); // send it to the frontend

  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

async function getData(req, res) {
  try {
    await res.json("hi");
  } catch (err) {
    res.status(400).json(err);
  }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

