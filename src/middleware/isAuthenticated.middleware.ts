import { Request, Response, NextFunction } from 'express';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ msg: 'Not Authenticated' });
    }
}
