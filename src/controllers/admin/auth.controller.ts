import Admin from "../../models/admin.model";
import {Request, Response, NextFunction} from "express";
import passport, {AuthenticateCallback} from "passport";
import {handleErrorResponse, handleSuccessResponse} from "../../utils/responseUtils.util";


export async function adminLogInHandler(req: Request, res : Response, next: NextFunction) {
    passport.authenticate('admin-local', (
        err : Error | null,
        user : Express.User | false | null,
        info : object | string | Array<string | undefined>) =>  {

        if (!user) {
            return res.status(401).json({ msg: info });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ msg: 'Authentication successful'});
        });

    })(req, res, next);
}

export const logOutHandler = (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return handleErrorResponse(res, 400, 'Something went wrong');
        }
        return handleSuccessResponse(res, 200, 'Logout successful');
    });
};
