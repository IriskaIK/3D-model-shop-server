import Product from '../models/product.model'
import Cart from '../models/cart.model'
import User from '../models/user.model'
import {NextFunction, Response, Request} from "express";
import {IProductUpdateRequestBody} from "@/types/cart/request.types";
import {IProductsRequestParam} from "@/types/products/request.types"
import {handleSuccessResponse} from "@/utils/responseUtils.util";
import {ValidationError, DatabaseError, NotFoundError, AuthorizationError} from "@/types/customError.types";


export async function addProductToCart(req: Request<IProductsRequestParam>, res: Response, next: NextFunction) {
    if (!req.user) {
        return next(new AuthorizationError('Unauthorized'));
    }
    const {id} = req.params
    const userId = req.user.id;
    const product = await Product.query().findById(id);

    if (!product) {
        return next(new ValidationError('Product not found'));
    }
    try {

        await Cart.query().insert({
            product_id: id,
            user_id: userId,
            quantity: 1,
        });
        handleSuccessResponse(res, 201, 'Product added successfully.')
    } catch (e) {
        next(new DatabaseError('DB Error: Error during cart insertion'));
    }
}

export async function getProductsInCart(req: Request, res: Response<Product[]>, next: NextFunction) {
    if (!req.user) {
        return next(new AuthorizationError('Unauthorized'));
    }
    const userId = req.user.id;
    try {
        const productsInCart = await User.query()
            .findOne('id', '=', userId)
            .withGraphFetched('cart(cartSelectOptions)')
            .modifiers({
                    cartSelectOptions(builder) {
                        builder.select('slug', 'title', 'subtitle', 'content', 'price', 'currency', 'isInStock', 'id')
                            .withGraphFetched('category(categorySelectOptions)')
                            .withGraphFetched('images(imagesSelectOptions)')
                            .modifiers(
                                {
                                    categorySelectOptions(builder) {
                                        builder.select('id', 'title', 'content')
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
        next(new DatabaseError("DB Error: Error during cart fetching"))
    }
}

export async function removeProductFromCart(req: Request<IProductsRequestParam>, res: Response, next: NextFunction){
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));

    }
    const userId = req.user.id;
    const id = req.params.id;

    try {

        await Cart.query()
            .delete()
            .where('product_id', id)
            .andWhere('user_id', userId)
        handleSuccessResponse(res, 200, 'Product successfully removed from cart.')
    } catch (e) {
        next(new DatabaseError("DB Error: Error during deleting product from cart."))
    }
}

export async function getQuantityOfProductInCart(req: Request<IProductsRequestParam>, res: Response<Cart[]>, next: NextFunction) {
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));

    }
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const quantity = await Cart.query()
            .select('quantity')
            .where('product_id', id)
            .andWhere('user_id', userId)
        res.status(200)
        res.send(quantity)
    } catch (e) {
        next(new DatabaseError("DB Error: Error during fetching quantity of product in cart."))
    }

}

export async function updateProductInCart(req : Request<{}, {}, IProductUpdateRequestBody>, res : Response, next : NextFunction){
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));
    }
    const userId = req.user.id;
    const {id, quantity} = req.body

    try {
        await Cart.query()
            .patch({quantity : quantity})
            .where('product_id', id)
            .andWhere('user_id', userId)
        res.status(200).send({msg:'Product in cart successfully updated.'})
    }catch (e){
        next(new DatabaseError("DB Error: Error during updating quantity of product in cart."))
    }

}

