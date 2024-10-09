import Product from '../models/product.model'
import Wishlist from '../models/wishlist.model'
import User from '../models/user.model'
import {NextFunction, Request, Response} from "express";
import {IProductsRequestParam} from "@/types/products/request.types";
import {handleSuccessResponse} from "@/utils/responseUtils.util";
import {ValidationError, DatabaseError, NotFoundError, AuthorizationError} from "@/types/customError.types";


export async function addProductToWishList(req : Request<IProductsRequestParam>, res : Response, next: NextFunction){
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));
    }
    const id = req.params.id
    const userId = req.user.id;

    try {
        await Wishlist.query().insert({
            product_id : id,
            user_id : userId
        })
        handleSuccessResponse(res, 200, 'Product added successfully.')
    }catch (e){
        next(new DatabaseError('DB Error: Error during inserting product into wishlist'));
    }
}

export async function getProductsInWishlist(req : Request, res : Response<Product[]>, next: NextFunction){
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));
    }
    const userId = req.user.id;
    try {
        const productsInWishlist = await User.query()
            .findOne('id', '=', userId)
            .withGraphFetched('wishlist(wishlistSelectOptions)')
            .modifiers({
                    wishlistSelectOptions(builder){
                        builder.select('slug','title', 'subtitle', 'content', 'price', 'isInStock', 'wishlist.id as product_id')
                            .withGraphFetched('category(categorySelectOptions)')
                            .withGraphFetched('images(imagesSelectOptions)')
                            .modifiers(
                                {
                                    categorySelectOptions(builder) {
                                        builder.select('id', 'title', 'content')
                                    },
                                    imagesSelectOptions(builder){
                                        builder.select('filename', 'path')
                                    }

                                }
                            )
                    }
                }
            )
        if(productsInWishlist){
            res.send(productsInWishlist.wishlist)
        }else{
            handleSuccessResponse(res, 200, "Wishlist in empty")
        }

    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching wishlist"))
    }
}

export async function removeProductFromWishlist(req : Request<IProductsRequestParam>, res : Response, next: NextFunction){
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));
    }
    const userId = req.user.id;
    const id = req.params.id
    try {
        await Wishlist.query()
            .delete()
            .where('product_id', id)
            .andWhere('user_id', userId)
        handleSuccessResponse(res, 200, 'Successfully removed from wishlist.')
    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching wishlist"))
    }
}
