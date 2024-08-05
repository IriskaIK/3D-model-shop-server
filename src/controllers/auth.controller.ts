import User from "../models/user.model";
import {Request, Response, NextFunction} from "express";
import {hashPassword} from "../utils/authHelper.util";
import passport, {AuthenticateCallback} from "passport";
import {handleErrorResponse, handleSuccessResponse} from "../utils/responseUtils.util";

interface IRequestBody{
    email: string;
    password: string;
    first_name: string;
}

export async function regUser(req : Request<{}, {}, IRequestBody>, res : Response, next : NextFunction){
    const {email, first_name, password} = req.body;
    const user = await User.query().findOne("email", "=", email);

    if(user){
        res.status(400)
        res.send({msg : "User already exists"});
    }else{
        const newUser = await User.query()
            .insertGraphAndFetch({
                first_name : first_name,
                email : email,
                password : password,
                avatar : {

                },
                shipping_address:{

                },
                type : 'user'
            })
            .select("id", "first_name", "email", "password")
        req.login(newUser, (err)=>{
            if(err){
                return next(err)
            }
            res.status(201)
            console.log(newUser)
            res.send({msg : "Created"});
        })
    }
}


export async function logInHandler(req: Request, res : Response, next: NextFunction) {
    passport.authenticate('user-local', (
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
