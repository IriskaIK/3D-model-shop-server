import User from "../models/user.model";
import {Request, Response, NextFunction} from "express";
import passport from "passport";
import { handleSuccessResponse} from "@/utils/responseUtils.util";
import {ValidationError, DatabaseError} from "@/types/customError.types";

interface IRequestBody {
    email: string;
    password: string;
    first_name: string;
}

export async function regUser(req: Request<{}, {}, IRequestBody>, res: Response, next: NextFunction) {
    const {email, first_name, password} = req.body;
    const user = await User.query().findOne("email", "=", email);

    if (user) {
        next(new ValidationError('User already exists'));
    } else {
        try {
            const newUser = await User.query()
                .insertGraphAndFetch({
                    first_name: first_name,
                    email: email,
                    password: password,
                    avatar: {},
                    shipping_address: {},
                    type: 'user'
                })
                .select("id", "first_name", "email", "password")
            req.login(newUser, (err) => {
                if (err) {
                    return next(err)
                }
                res.status(201)
                console.log(newUser)
                res.send({msg: "Created"});
            })
        } catch (e) {
            next(new DatabaseError('DB Error: Error during creating user'));
        }


    }
}


export async function logInHandler(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('user-local', (
        err: Error | null,
        user: Express.User | false | null,
        info: object | string | Array<string | undefined>) => {

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
