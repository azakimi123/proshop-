const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {
  let token 

  //checks for the token from user
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //decoding the token
    try {
      //takes the token without the 'Bearer' begining
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)

      //sets the user with the data
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not Authorized, Token Failed')
    }
  }

  if(!token){
    res.status(401)
    throw new Error('Not Authorized, No Token')
  }

})

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

module.exports = {protect, admin}
