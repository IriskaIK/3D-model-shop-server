import Product from '../models/product.model'
import Wishlist from '../models/wishlist.model'
import User from '../models/user.model'
import {NextFunction, Request, Response} from "express";
import {IProductsRequestParam} from "../types/products/request.types";
import {handleSuccessResponse} from "../utils/responseUtils.util";


export async function addProductToWishList(req : Request<IProductsRequestParam>, res : Response, next: NextFunction){
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const id = req.params.id
    const userId = req.user.id;

    try {
        const product = await Product.query().findOne("publicId", "=", id);
        if (!product) {
            next(new Error("Invalid input"));
            return;
        }
        await Wishlist.query().insert({
            product_id : product.id,
            user_id : userId
        })
        res.status(200).send({msg:'Product added successfully.'})

    }catch (e){
        next(e)
    }
}

export async function getProductsInWishlist(req : Request, res : Response<Product[]>, next: NextFunction){
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;

    try {
        const productsInWishlist = await User.query()
            .findOne('id', '=', userId)
            .withGraphFetched('wishlist(wishlistSelectOptions)')
            .modifiers({
                    wishlistSelectOptions(builder){
                        builder.select('publicId','title', 'subtitle', 'content', 'price', 'currency', 'isInStock')
                            .withGraphFetched('category(categorySelectOptions)')
                            .withGraphFetched('images(imagesSelectOptions)')
                            .modifiers(
                                {
                                    categorySelectOptions(builder) {
                                        builder.select('publicId', 'title', 'content')
                                            .withGraphFetched('images(imagesSelectOptions)')
                                            .modifiers({
                                                imagesSelectOptions(builder){
                                                    builder.select('filename', 'path')
                                                }
                                            })
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
        next(e)
    }
}

export async function removeProductFromWishlist(req : Request<IProductsRequestParam>, res : Response, next: NextFunction){
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    const id = req.params.id
    try {
        const product = await Product.query().findOne("publicId", "=", id);
        if (!product) {
            next(new Error("Invalid input"));
            return;
        }
        await Wishlist.query()
            .delete()
            .where('product_id', product.id)
            .andWhere('user_id', userId)
        res.status(200).send({msg:'Successfully removed from wishlist.'})
    }catch (e){
        next(e)
    }
}
