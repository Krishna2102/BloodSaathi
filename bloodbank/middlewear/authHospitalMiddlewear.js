require('dotenv').config(); // Load environment variables
// authMiddleware.js

const jwt = require('jsonwebtoken');
const Hospital=require('../model/hospital'); // Import hospital model
const express = require('express');

// Authentication middleware (JWT-based for example)
const authenticateHospital = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    

    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
       
        req.user = decoded; // Attach the decoded user information to the request

        // Optionally, fetch the user from the database (if you need to check existence)
        const user = await Hospital.findById(req.user.user_id);
        // console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Token is not valid' });
    }
};


module.exports = require('dotenv').config(); // Load environment variables
// authMiddleware.js


// Authentication middleware (JWT-based for example)
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
       
        req.user = decoded; // Attach the decoded user information to the request

        // Optionally, fetch the user from the database (if you need to check existence)
        const user = await User.findById(req.user.user_id);
        // console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Token is not valid' });
    }
};


module.exports = authenticateHospital;
