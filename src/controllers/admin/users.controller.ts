import {NextFunction, Response, Request} from "express";
import {IManyUsersRequestBody, IUserRequestParam} from "@/types/admin/users/request.types";
import {UserQueryBuilder} from "@/services/queryBuilder/usersQueryBuilder.service";
import User from "../../models/user.model";
import {IManyUserResponse} from "@/types/admin/users/response.types";
import {ValidationError, DatabaseError} from "@/types/customError.types";
import {handleSuccessResponse} from "@/utils/responseUtils.util";

export async function getUsers(req: Request<{}, {}, IManyUsersRequestBody>, res: Response<IManyUserResponse>, next: NextFunction) {
    let {
        offset
    } = req.body
    if (!offset) offset = 0;

    const users = new UserQueryBuilder(req.body)
    try {
        res.json({
            users: await users.execute(),
            offset: offset + users.getOffsetLimit()
        })
    } catch (e) {
        next(new DatabaseError("DB Error: Error during fetching users."))
    }
}

export async function getUserByID(req: Request<IUserRequestParam>, res: Response<User>, next: NextFunction) {
    const {id} = req.params
    const users = new UserQueryBuilder({})
    try {
        res.send(await users.getUserById(id))
    } catch (e) {
        next(new DatabaseError("DB Error: Error during fetching user."))
    }
}

// export async function editUserById(req: Request<IUserRequestParam>, res: Response, next : NextFunction){
//     const {id} = req.params
//     // validate body
//     if(id){
//         try {
//             await User.query().patch().where('id', id)
//         }
//         catch (e){
//             next(e)
//         }
//     }
//
// }

export async function deleteUserById(req: Request<IUserRequestParam>, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (id) {
        try {

            await User.query().delete().where('id', id)
            handleSuccessResponse(res, 200, `User with id: ${id} deleted successfully.`)
        } catch (e) {
            next(new DatabaseError("DB Error: Error during deleting user."))
        }
    }
}

// rewrite models and logic for shipping address
// export async function getAllShippingAddress(req: Request, res: Response, next : NextFunction){
//
// }