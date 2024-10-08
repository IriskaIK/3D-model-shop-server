import { Request, Response, NextFunction } from 'express';

export default function ensureAuthenticated(role: 'user' | 'admin') {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated() && req.user && req.user.type === role) {
            return next();
        }
        res.status(401).json({ msg: 'Not Authenticated' });
    };
}