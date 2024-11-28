// adminMiddleware.js
const express = require('express');

const adminOnly = (req, res, next) => {
    // console.log(`User Role: ${req.user ? req.user.role : 'No user'}`);
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
};

module.exports = adminOnly;
