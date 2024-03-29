const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');


//@desc     Register a new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler (async (req, res) => {
    // Get user from req.body object
    const {name, email, password} = req.body;

    // 2 Validation 
    if(!name || !email || !password){
      res.status(400)
      throw new Error('Please include all fields')
    }

    // 3 Find if user already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // 4 Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5 To Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
 
    // 6 Once user created
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email ,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Credential');
    }
});

//@desc     Login a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler (async (req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email});

    //Check if user and password match 
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            token: generateToken(user._id)
        });
    }else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
});

//@desc     Get current user
//@route    GET /api/users/me
//@access   Pravite
const getMe = asyncHandler (async (req, res) => {
    const user ={
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user);
});

// Generate token 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports ={
    registerUser,
    loginUser,
    getMe
}