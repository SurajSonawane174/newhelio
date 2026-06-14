const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const Admin = require('./models/Admin');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
// Inside backend/server.js


// Inside backend/server.js

app.use(cors({
    // Explicitly allow both localhost and 127.0.0.1 aliases
    // origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    origin: ['http://localhost:5173', 'https://heliocoder.vercel.app'],
    credentials: true, 
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Added OPTIONS for strict preflight handling
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // <-- add this
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Session Setup
// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'a_very_secure_random_string',
    resave: false,
    saveUninitialized: false,
    
    // 🚨 Update this specific line:
    store: (MongoStore.default || MongoStore).create({ mongoUrl: process.env.MONGODB_URI }),
    
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production' 
    }
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Routes
app.use('/api/v1', portfolioRoutes);

// app.listen(8080, () => console.log('Server running on port 8080'));
// Only run the listen command if you are testing locally on your laptop
if (process.env.NODE_ENV !== 'production') {
    app.listen(8080, () => console.log('Server running locally on port 8080'));
}

// Export the app so Vercel can run it as a serverless function
module.exports = app;