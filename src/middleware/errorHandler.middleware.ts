import {Request, Response, NextFunction} from 'express';
import {NotFoundError, ValidationError, DatabaseError, AuthorizationError} from '@/types/customError.types'; // Import the error classes

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        console.log(1)
        return next(err);
    }

    if (err instanceof NotFoundError || err instanceof ValidationError || err instanceof DatabaseError || err instanceof AuthorizationError) {
        console.log(1)
        res.status(err.status).json({error: err.message});
    } else {
        res.status(500).json({error: 'An unexpected error occurred.'});
    }
}

export default errorHandler;