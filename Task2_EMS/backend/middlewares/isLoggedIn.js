import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Checks user is logged in based on passed token and set the user in request
export const isLoggedIn = async (req, res, next) => {
    // token could be found in request cookies or in reqest headers
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Login first to access this page',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        // Handle JWT verification error
        console.error('JWT verification error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};