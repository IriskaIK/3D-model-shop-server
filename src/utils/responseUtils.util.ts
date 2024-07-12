import { Response } from 'express';

export const handleErrorResponse = (res: Response, statusCode: number, message: string) => {
    return res.status(statusCode).json({ msg: message });
};

export const handleSuccessResponse = (res: Response, statusCode: number, message: string) => {
    return res.status(statusCode).json({ msg: message });
};