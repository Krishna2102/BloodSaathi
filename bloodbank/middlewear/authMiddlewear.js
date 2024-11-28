const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');
let apiCalls = 0;
const authenticateAdmin = async (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    apiCalls++;
    console.log(apiCalls);
    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;

        // Check if the user is in the database
        const admin = await Admin.findById(req.user.user_id);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authenticateAdmin;
