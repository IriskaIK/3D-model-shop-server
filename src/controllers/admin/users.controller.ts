import {NextFunction, Response, Request} from "express";
import {IManyUsersRequestBody, IUserRequestParam} from "../../types/admin/users/request.types";
// import {UserQueryBuilder} from "../../services/admin/usersQueryBuilder";
import {UserQueryBuilder} from "../../services/queryBuilder/usersQueryBuilder.service";

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
        res.send(await users.getProductById(id))
    }catch (e){
        next(e)
    }
}