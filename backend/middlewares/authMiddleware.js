const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    });
};

const staffAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== 'Staff') {
            return res.status(403).json({ message: 'Staff access required' });
        }
        next();
    });
};

module.exports = { auth, adminAuth, staffAuth };