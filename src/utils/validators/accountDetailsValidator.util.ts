import {NextFunction, Request, Response} from "express";
import {IAccountDetailsRequestBody} from "../../types/account/request.types";

function isValidPhoneNumber(phone : string) {
    return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
}

export function validateAccountDetails(req : Request<{}, {}, IAccountDetailsRequestBody>, res : Response, next : NextFunction){
    const { firstName, lastName, email, phoneNumber } = req.body;
    if(firstName && lastName && email && phoneNumber && isValidPhoneNumber(phoneNumber)){
        next()
    }else{
        throw new Error(`Invalid account details data`);
    }
}