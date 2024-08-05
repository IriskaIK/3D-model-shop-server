import {NextFunction, Request, Response} from "express";
import {IOrderBodyRequest} from "../../types/order/request.types";

function isValidPhoneNumber(phone : string) {
    return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
}

export function validateOrder(req : Request<{}, {}, IOrderBodyRequest>, res : Response, next : NextFunction){
    const { recipient, shipping_address } = req.body;
    if(recipient && shipping_address && isValidPhoneNumber(recipient.phone)){
        next()
    }else{
        throw new Error(`Invalid account details data`);
    }
}