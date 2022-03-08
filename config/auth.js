// const jwt = require('jsonwebtoken');
// const User = require('../models/User')

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


module.exports = function(req, res, next) {
    // Check for the token being sent in three different ways
    let token = req.get('Authorization') || req.query.token || req.body.token;
    if (token) {
        // Remove the 'Bearer ' if it was included in the token header
        token = token.replace('Bearer ', '');
        // Check if token is valid and not expired
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                next(err);
              } else {
                  // It's a valid token, so add user to req
                  req.user = decoded.user;    
                  next();
                }
              });
            } else {
                next();
              }
            };




            // const protect = async function (req, res, next) {
            //   try {
            //     let token;
            
            //     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            //       try {
            //         token = req.headers.authorization.split('')[1]
            
            //         //verify token
            //         const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //         //get user from the token
            //         req.user = await User.findById(decoded.id).select('-password')
            
            //         next()
            //       } catch (error) {
            //         console.log(error)
            //         res.status(401)
            //         throw new Error('Not authorized')
            //       }
            //     }
            //     if (!token) {
            //       res.status(401)
            //       throw new Error('not authorized, no token'
            //       )
            //     }
            //   } catch (err) {
            //     res.status(400).json('protected');
            //   }
            
            // }
            
            // module.exports = { protect }