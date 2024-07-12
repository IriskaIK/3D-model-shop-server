import { Request, Response, NextFunction } from 'express';
import {CustomError} from "../types/customError.types";
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        const serializedErrors = err.serializeErrors();
        return res.status(err.statusCode).json({ errors: serializedErrors });
    }

    console.error(err);
    console.log("Error handled by middleware");
    res.status(500).json({ errors: [{ message: err.message }] });
}