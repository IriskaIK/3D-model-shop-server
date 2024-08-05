import {Request, Response, NextFunction} from 'express';
import ShippingAddress from "../models/shippingAddress.model";
import User from "../models/user.model";
import {IAccountDetailsRequestBody, IDeliveryDetailsRequestBody} from "../types/account/request.types";

export async function getUserAccountDetails(req: Request, res: Response<User>, next: NextFunction) {
    if (req.user) try {
        const user = await User.query()
            .findById(req.user.id)
            .select('email', 'first_name', 'last_name', 'phone')
            .withGraphFetched('[avatar(avatarSelectOptions), shipping_address(addressSelectOptions)]')
            .modifiers({
                avatarSelectOptions(builder) {
                    builder.select('filename', 'path');
                },
                addressSelectOptions(builder) {
                    builder.select('region', 'city', 'postOffice');
                },
            });

        if (user) {
            res.send(user);
        } else {
            res.redirect('/api/auth/login');
        }
    } catch (error) {
        next(error)
    }
}



export async function updateAccountDetails(req: Request<{}, {}, IAccountDetailsRequestBody>, res: Response<User>, next : NextFunction): Promise<void> {
    if (req.user) {
        try {
            await User.query().patch({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                phone: req.body.phoneNumber,
                email: req.body.email,
            }).where('id', req.user.id);
            const user = await User.query()
                .findById(req.user.id)
                .select('email', 'first_name', 'last_name', 'phone')
                .withGraphFetched('[avatar(avatarSelectOptions), shipping_address(addressSelectOptions)]')
                .modifiers({
                    avatarSelectOptions(builder) {
                        builder.select('filename', 'path');
                    },
                    addressSelectOptions(builder) {
                        builder.select('region', 'city', 'postOffice');
                    },
                });

            res.status(200).send(user);
        } catch (error) {
            next(error)
        }
    } else {
        throw new Error('Invalid inputs')
    }
}





export async function updateDeliveryDetails(req: Request<{}, {}, IDeliveryDetailsRequestBody>, res: Response, next : NextFunction): Promise<void> {
    if (req.user){
        try {
            const user = await User.query().findById(req.user.id)
            if (user) {
                let shippingAddress = await ShippingAddress.query()
                    .findById(user.shippingAddress_id)
                if (shippingAddress) {
                    await shippingAddress.$query().patchAndFetch({
                        region : req.body.region,
                        city : req.body.city,
                        postOffice : req.body.postOffice,
                    })
                }
            }
            res.status(200)

        } catch (error) {
            next(error)
        }
    }else{
        throw new Error('Invalid inputs')
    }


}

export async function getDeliveryDetails(req: Request, res : Response<ShippingAddress>, next : NextFunction) : Promise<void>{
    if(req.user){
        try {
            const user = await User.query().findById(req.user.id)
            if (user) {
                let shippingAddress = await ShippingAddress.query()
                    .findById(user.shippingAddress_id)
                if (shippingAddress) {
                    res.send(shippingAddress);
                }
            }
        }catch (error){
            console.error(error);
            next(Error)
        }

    }
}