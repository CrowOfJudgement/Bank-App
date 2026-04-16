import jwt from 'jsonwebtoken';
import userModel from '../DB/models/user.model.js';

export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid or missing token" });
        }
        

        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ay 7aga');
        
        if (!decoded?.id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: "Access denied: Admins only" });
};