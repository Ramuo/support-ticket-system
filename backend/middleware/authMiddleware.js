const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const protect = asyncHandler(async(req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Let's Get token fom header
            token = req.headers.authorization.split(' ')[1];
            // Let's verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Let's get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next();
        } catch (error) { 
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    //Let's check if there is no token
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
});

module.exports = {protect}
