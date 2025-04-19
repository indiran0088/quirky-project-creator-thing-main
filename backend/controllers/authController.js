const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import from models/index.js
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        // Use the properly initialized User model
        const user = await User.findOne({ where: { email } });
        
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        if (user.role !== role) return res.status(403).json({ message: 'Access denied for this role' });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        console.log(`${user.email} logged in successfully`);
        res.json({ 
          token, 
          user: { 
            id: user.id, 
            email: user.email, 
            role: user.role 
          } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };