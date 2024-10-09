import {Request, Response, NextFunction} from 'express';
import ShippingAddress from "../models/shippingAddress.model";
import User from "../models/user.model";
import {IAccountDetailsRequestBody, IDeliveryDetailsRequestBody} from "@/types/account/request.types";
import {AuthorizationError, DatabaseError, NotFoundError} from "@/types/customError.types";
import {handleSuccessResponse} from "@/utils/responseUtils.util";

export async function getUserAccountDetails(req: Request, res: Response<User>, next: NextFunction) {

    if (req.user) {
        try {
            const user = await User.query()
                .findById(req.user.id)
                .select('email', 'first_name', 'last_name', 'phone')
                    .withGraphFetched('[avatar(avatarSelectOptions), shipping_address.[city, region, postOffice]]')
                .modifyGraph('shippingAddress', (builder) => {
                    builder.select('id', 'full_address'); // Fetch specific fields
                })
                .modifyGraph('shippingAddress.city', (builder) => {
                    builder.select('name'); // Only select the 'name' field
                })
                .modifyGraph('shippingAddress.region', (builder) => {
                    builder.select('name'); // Only select the 'name' field
                })
                .modifyGraph('shippingAddress.postOffice', (builder) => {
                    builder.select('address as name'); // Select 'address' but return it as 'name' for consistency
                })
                .modifiers({
                    avatarSelectOptions(builder) {
                        builder.select('filename', 'path');
                    },
                });
            //
            //
            // const test =  User.query()
            //     .findById(req.user.id)
            //     .select('email', 'first_name', 'last_name', 'phone')
            //     .withGraphFetched('[avatar(avatarSelectOptions), shipping_address.[city, region, postOffice]]')
            //     .modifyGraph('shippingAddress', (builder) => {
            //         builder.select('id', 'full_address'); // Fetch specific fields
            //     })
            //     .modifyGraph('shippingAddress.city', (builder) => {
            //         builder.select('name'); // Only select the 'name' field
            //     })
            //     .modifyGraph('shippingAddress.region', (builder) => {
            //         builder.select('name'); // Only select the 'name' field
            //     })
            //     .modifyGraph('shippingAddress.postOffice', (builder) => {
            //         builder.select('address as name'); // Select 'address' but return it as 'name' for consistency
            //     })
            //     .modifiers({
            //         avatarSelectOptions(builder) {
            //             builder.select('filename', 'path');
            //         },
            //     });

            if (user) {
                res.send(user);
            } else {
                next(new NotFoundError("User not found"));
            }
        } catch (error) {
            next(new DatabaseError('DB Error: Error during fetching user data'))
        }
    } else {
        next(new AuthorizationError("Not authorized"));
    }
}


export async function updateAccountDetails(req: Request<{}, {}, IAccountDetailsRequestBody>, res: Response<User>, next: NextFunction): Promise<void> {
    if (req.user) {
        try {
            await User.query().patch({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                phone: req.body.phoneNumber.replace(/-/g, ''),
                email: req.body.email,
            }).where('id', req.user.id);
            const user = await User.query()
                .findById(req.user.id)
                .select('email', 'first_name', 'last_name', 'phone')
                .withGraphFetched('[avatar(avatarSelectOptions), shipping_address.[city, region, postOffice]]')
                .modifyGraph('shippingAddress', (builder) => {
                    builder.select('id', 'full_address'); // Fetch specific fields
                })
                .modifyGraph('shippingAddress.city', (builder) => {
                    builder.select('name'); // Only select the 'name' field
                })
                .modifyGraph('shippingAddress.region', (builder) => {
                    builder.select('name'); // Only select the 'name' field
                })
                .modifyGraph('shippingAddress.postOffice', (builder) => {
                    builder.select('address as name'); // Select 'address' but return it as 'name' for consistency
                })
                .modifiers({
                    avatarSelectOptions(builder) {
                        builder.select('filename', 'path');
                    },
                });

            res.status(200).send(user);
        } catch (error) {
            next(new DatabaseError('DB Error: Error during fetching user data'))
        }
    } else {
        next(new AuthorizationError("Not authorized"));
    }
}


export async function updateDeliveryDetails(req: Request<{}, {}, IDeliveryDetailsRequestBody>, res: Response, next: NextFunction): Promise<void> {
    if (req.user) {
        try {
            const user = await User.query().findById(req.user.id)

            if (user) {
                let shippingAddress = await ShippingAddress.query()
                    .findById(user.shippingAddress_id)

                if (shippingAddress) {
                    await ShippingAddress.query().patch({
                        region_id: req.body.region_id,
                        city_id: req.body.city_id,
                        postOffice_id: req.body.postOffice_id,
                    }).where('id', user.shippingAddress_id)
                }
            } else {
                next(new NotFoundError("User not found"));
            }
            handleSuccessResponse(res, 200, "Updated!")


        } catch (error) {
            next(new DatabaseError('DB Error: Error during fetching user data'))
        }
    } else {
        next(new AuthorizationError("Not authorized"));
    }


}

export async function getDeliveryDetails(req: Request, res: Response<ShippingAddress>, next: NextFunction): Promise<void> {
    if (req.user) {
        try {
            const user = await User.query().findById(req.user.id)
            if (user) {
                let shippingAddress = await ShippingAddress.query()
                    .findById(user.shippingAddress_id)
                    .withGraphFetched('[city, region, postOffice]')
                if (shippingAddress) {
                    res.send(shippingAddress);
                }
            } else {
                next(new NotFoundError("User not found"));
            }
        } catch (error) {
            next(new DatabaseError('DB Error: Error during fetching user data'))
        }
    } else {
        next(new AuthorizationError("Not authorized"));
    }
}