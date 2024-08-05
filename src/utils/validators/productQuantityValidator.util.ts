
import {Request, Response, NextFunction} from "express";
import {IProductUpdateRequestBody} from "../../types/cart/request.types";

export function validateProductQuantity(req : Request<{}, {}, IProductUpdateRequestBody>, res : Response, next: NextFunction) {
    const {id, quantity,} = req.body
    if(id && quantity && quantity > 0){
        next()
    }else{
        throw new Error(`Invalid delivery details data`);
    }
}