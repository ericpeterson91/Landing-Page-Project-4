const User = require('../models/User');
const jwt = require('jsonwebtoken'); // import the jwt library
const bcrypt = require('bcrypt'); // import bcrypt

const SALT_ROUNDS = 6; 

module.exports = {
  register,
  loginUser
};

async function register(req, res) {
  try {
    // NOTE: here we are storing a plaintext password. VERY VERY DANGEROUS. We will replace this in a second:
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const user = await User.create({name: req.body.name, email:req.body.email, password:hashedPassword,});

    // creating a jwt: 
    // the first parameter specifies what we want to put into the token (in this case, our user document)
    // the second parameter is a "secret" code. This lets our server verify if an incoming jwt is legit or not.
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.status(200).json(token); // send it to the frontend
    
  } catch (err) {
    res.status(400).json(err);
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check password. if it's bad throw an error.
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

    // if we got to this line, password is ok. give user a new token.
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.status(200).json(token)
  } catch {
    res.status(400).json('Bad Credentials');
  }
}
















// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// module.exports = {
//   register,
//   loginUser,
//   getData,
// };

// // const SALT_ROUNDS = 6;

// async function register(req, res) {
//   try {
//     const {name, email, password} = req.body

//     if (!name || !email || !password) {
//       res.status(400)
//       throw new Error('Please add all fields')
//     }
//     //check if user exists
//     const userExists = await User.findOne({email})

//     if (userExists){
//         res.status(400).json(err)
//         throw new Error('user exists already')
//     }

//     //hash password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)


//     //create user
//     const user = await User.create({name,
//          email,
//           password: hashedPassword
//         });
//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//       })
//     } else {
//       res.status(400)
//       throw new Error('Invalid user data')
//     }
//     // const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
//     // res.json(token); // send it to the frontend    
    
//   } catch (err) {
//     console.log("user creation error", err)
//     res.status(400).json(err);
//   }
// }

// async function loginUser(req, res) {
//   try {

//     const {email, password} = req.body

//     const user = await User.findOne({ email});

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//       }

//       )
//     } else {
//       res.status(400)
//       throw new Error('invalid credentials')
//     }
//     // if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

//     // const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
//     // res.json(token); // send it to the frontend

//   } catch (err) {
//     res.status(400).json('Bad Credentials');
//   }
// }

// async function getData(req, res) {
//   try {
//     await res.json("hi");
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: '24h'
//     })
// }

