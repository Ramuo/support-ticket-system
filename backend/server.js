const path = require('path');
const express = require('express');
const colrs = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();


// Initialize de express app
const app = express();

// Set up the body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));


//serve frontend
if(process.env.NODE_ENV === 'production'){
    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))


    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}else{
    // to create a route
    app.get('/', (req , res)=> {
        res.status(200).json({message: 'Welcome to the support Desk API'})
    })
}

app.use(errorHandler);

// Set up the server
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`) );