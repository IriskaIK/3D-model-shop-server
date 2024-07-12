import Product from '../models/product.model'
import Cart from '../models/cart.model'
import User from '../models/user.model'
import {NextFunction, Response, Request} from "express";
import {IProductUpdateRequestBody} from "../types/cart/request.types";
import {IProductsRequestParam} from "../types/products/request.types"
import {handleSuccessResponse} from "../utils/responseUtils.util";

export async function addProductToCart(req: Request<IProductsRequestParam>, res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const {id} = req.params
    const userId = req.user.id;

    try {
        const product = await Product.query().findOne("publicId", "=", id)
        if (!product){
            next(new Error("Invalid input"));
            return;
        } await Cart.query().insert({
            product_id: product.id,
            user_id: userId,
            quantity: 1,
        });
        res.status(200).send({msg: "Product added successfully."});
    } catch (e) {
        next(e)
    }
}

export async function getProductsInCart(req: Request, res: Response<Product[]>, next: NextFunction): Promise<void> {
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    try {
        const productsInCart = await User.query()
            .findOne('id', '=', userId)
            .withGraphFetched('cart(cartSelectOptions)')
            .modifiers({
                    cartSelectOptions(builder) {
                        builder.select('publicId', 'title', 'subtitle', 'content', 'price', 'currency', 'isInStock')
                            .withGraphFetched('category(categorySelectOptions)')
                            .withGraphFetched('images(imagesSelectOptions)')
                            .modifiers(
                                {
                                    categorySelectOptions(builder) {
                                        builder.select('publicId', 'title', 'content')
                                            .withGraphFetched('images(imagesSelectOptions)')
                                            .modifiers({
                                                imagesSelectOptions(builder) {
                                                    builder.select('filename', 'path')
                                                }
                                            })
                                    },
                                    imagesSelectOptions(builder) {
                                        builder.select('filename', 'path')
                                    }

                                }
                            )
                    }
                }
            )
        if(productsInCart) {
            res.send(productsInCart.cart);
        }else{
            handleSuccessResponse(res, 200, "Cart is empty")
        }
    } catch (e) {
        next(e)
    }
}

export async function removeProductFromCart(req: Request<IProductsRequestParam>, res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const product = await Product.query().findOne("publicId", "=", id);
        if(!product){
            next(new Error("Invalid input"));
            return;
        }
        await Cart.query()
            .delete()
            .where('product_id', product.id)
            .andWhere('user_id', userId)
        res.status(200).send({msg: 'Product successfully removed from cart.'})
    } catch (e) {
        next(e)
    }
}

export async function getQuantityOfProductInCart(req: Request<IProductsRequestParam>, res: Response<Cart[]>, next: NextFunction) {
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const product = await Product.query().findOne("publicId", "=", id);
        if(!product){
            next(new Error("Invalid input"));
            return
        }
        const quantity = await Cart.query()
            .select('quantity')
            .where('product_id', product.id)
            .andWhere('user_id', userId)
        res.status(200)
        res.send(quantity)
    } catch (e) {
        next(e)
    }

}

export async function updateProductInCart(req : Request<{}, {}, IProductUpdateRequestBody>, res : Response, next : NextFunction){
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    const {id, quantity} = req.body

    try {
        const product = await Product.query().findOne("publicId", "=", id);
        if(!product){
            next(new Error("Invalid input"));
            return
        }
        await Cart.query()
            .patch({quantity : quantity})
            .where('product_id', product.id)
            .andWhere('user_id', userId)
        res.status(200).send({msg:'Product in cart successfully updated.'})
    }catch (e){
        next(e)
    }

}

