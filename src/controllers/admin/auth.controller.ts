import Admin from "../../models/admin.model";
import {Request, Response, NextFunction} from "express";
import passport, {AuthenticateCallback} from "passport";
import {handleSuccessResponse} from "@/utils/responseUtils.util";
import {ValidationError, DatabaseError} from "@/types/customError.types";


export async function adminLogInHandler(req: Request, res : Response, next: NextFunction) {
    passport.authenticate('admin-local', (
        err : Error | null,
        user : Express.User | false | null,
        info : object | string | Array<string | undefined>) =>  {

        if (!user) {
            return next(new ValidationError('User does not exist'));
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(new Error("Something went wrong"));
            }
            return handleSuccessResponse(res, 200, 'Authentication successful');
        });

    })(req, res, next);
}

export const logOutHandler = (req: Request, res: Response, next : NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(new Error("Something went wrong"));
        }
        return handleSuccessResponse(res, 200, 'Logout successful');
    });
};
