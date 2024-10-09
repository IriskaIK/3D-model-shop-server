import {IDeliveryDetailsRequestBody} from "../../types/account/request.types";
import {Request, Response, NextFunction} from "express";

export function validateDeliveryDetails(req : Request<{}, {}, IDeliveryDetailsRequestBody>, res : Response, next: NextFunction) {
    const {region_id, city_id, postOffice_id} = req.body
    if(region_id && city_id && postOffice_id){
        next()
    }else{
        throw new Error(`Invalid delivery details data`);
    }
}