import {NextFunction, Response, Request} from "express";
import {IManyUsersRequestBody, IUserRequestParam} from "../../types/admin/users/request.types";
import {UserQueryBuilder} from "../../services/queryBuilder/usersQueryBuilder.service";
import User from "../../models/user.model";

export async function getUsers(req: Request<{}, {}, IManyUsersRequestBody>, res: Response, next : NextFunction) {
    let {
        offset
    } = req.body
    if(!offset) offset = 0;

    const users = new UserQueryBuilder(req.body)
    try{
        res.json({
            users : await users.execute(),
            offset : offset + users.getOffsetLimit()
        })
    }catch (e){
        next(e)
    }
}
export async function getUserByID(req: Request<IUserRequestParam>, res: Response, next : NextFunction){
    const {id} = req.params
    const users = new UserQueryBuilder({})
    try{
        res.send(await users.getUserById(id))
    }catch (e){
        next(e)
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

export async function deleteUserById(req: Request<IUserRequestParam>, res: Response, next : NextFunction){
    const {id} = req.params;
    if(id){
        try {
            await User.query().delete().where('id', id)
            res.status(200).send({msg : `User with id: ${id} deleted successfully.`})
        }catch (e){
            next(e)
        }
    }
}
// rewrite models and logic for shipping address
// export async function getAllShippingAddress(req: Request, res: Response, next : NextFunction){
//
// }