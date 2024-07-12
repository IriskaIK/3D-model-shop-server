import Orders from '../models/order.model';
import ProductSnapshot from '../models/productSnapshot.model';
import OrderItem from '../models/orderItem.model';
import Product from '../models/product.model';
import User from "../models/user.model";
import Cart from "../models/cart.model";
import {Request, Response, NextFunction} from "express";
import {IOrderBodyRequest} from "../types/order/request.types";
import Order from "../models/order.model";
import {handleSuccessResponse} from "../utils/responseUtils.util";

export async function createOrder(req: Request<{}, {}, IOrderBodyRequest>, res: Response, next: NextFunction){
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    const {recipient, shipping_address} = req.body;
    let productsInCart: User | undefined;
    try {
        productsInCart = await User.query()
            .findOne('id', '=', userId)
            .select('first_name')
            .withGraphFetched('cart')
    }catch (e){
        next(e);
    }
    if(!productsInCart){
        next(new Error("Cart is empty"));
        return;
    }
    const products = productsInCart.cart

    let productSnapShotData : Partial<ProductSnapshot>[] = []
    for(let index = 0; index < products.length; index++){
        productSnapShotData.push({
            title : products[index].title,
            subtitle : products[index].subtitle,
            price : products[index].price,
            currency : products[index].currency,
            product_id : products[index].id
        })
    }

    let orderData : Partial<Order> = {
        recipient : recipient,
        shipping_address : shipping_address,
        status : 'in progress',
        user_id : userId,
        orderItems : productSnapShotData
    }

    try{
        await Orders.query().insertGraph(orderData)
        for(let i = 0; i< products.length; i++){
            await Cart.query()
                .delete()
                .where('product_id', products[i].id)
                .andWhere('user_id', userId)
        }
    }catch (e) {
        next(e)
    }
    handleSuccessResponse(res, 201, 'Created')
}


export async function getOrders(req: Request, res : Response<Order[]>, next: NextFunction){
    if (!req.user) {
        next(new Error("Unauthorized"));
        return
    }
    const userId = req.user.id;
    try {
        const orders = await Orders.query()
            .where('user_id', '=', userId)
            .select('status', 'created_at', 'updated_at')
            .withGraphFetched('orderItems(orderItemsSelectOptions)')
            .withGraphFetched('recipient(recipientSelectOptions)')
            .withGraphFetched('shipping_address(shipping_addressSelectOptions)')
            .modifiers({
                orderItemsSelectOptions(builder){
                    builder.select('publicId', 'title', 'subtitle', 'price', 'currency')
                },
                recipientSelectOptions(builder){
                    builder.select('first_name', 'last_name', 'phone')
                },
                shipping_addressSelectOptions(builder){
                    builder.select('region', 'city', 'postOffice')
                }
            })
        res.send(orders)

    }catch (e){
        next(e)
    }

}
