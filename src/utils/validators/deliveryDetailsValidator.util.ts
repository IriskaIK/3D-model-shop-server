import {IDeliveryDetailsRequestBody} from "../../types/account/request.types";
import {Request, Response, NextFunction} from "express";

export function validateDeliveryDetails(req : Request<{}, {}, IDeliveryDetailsRequestBody>, res : Response, next: NextFunction) {
    const {region, city, postOffice} = req.body
    if(region && city && postOffice){
        next()
    }else{
        throw new Error(`Invalid delivery details data`);
    }
}