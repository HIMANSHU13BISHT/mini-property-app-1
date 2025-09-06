import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "No token, authorization denied"});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Token is not valid"});
    }
}

export const adminOnly = (req,res,next)  => {
    if (!req.user) {
        return res.status(401).json({ message: "Authorization required" });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
}
