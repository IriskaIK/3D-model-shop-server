import Orders from '../models/order.model';
import ProductSnapshot from '../models/productSnapshot.model';
import OrderItem from '../models/orderItem.model';
import Product from '../models/product.model';
import User from "../models/user.model";
import Cart from "../models/cart.model";
import {Request, Response, NextFunction} from "express";
import {IOrderBodyRequest} from "@/types/order/request.types";
import Order from "../models/order.model";
import {handleSuccessResponse} from "@/utils/responseUtils.util";

import {ValidationError, DatabaseError, NotFoundError, AuthorizationError} from "@/types/customError.types";
import productSnapshotModel from "../models/productSnapshot.model";
import OrderStatus from "@/models/orderStatus.model";

export async function createOrder(req: Request<{}, {}, IOrderBodyRequest>, res: Response, next: NextFunction) {

    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));
    }
    const userId = req.user.id;
    const {recipient, shipping_address} = req.body;
    let productsInCart: Cart[];
    try {
        productsInCart = await Cart.query()
            .where('user_id', userId)
            .andWhere('selected', true)
            .select('quantity')
            .withGraphFetched('product')


    } catch (e) {
        return next(new DatabaseError("DB Error: Error during fetching products int cart"));
    }
    if (!productsInCart) {
        return next(new ValidationError("Cart is empty"));
    }

    let productSnapShotData: Partial<ProductSnapshot>[] = []
    let productQuantityMap = new Map<number, number>();
    let totalPrice = 0;

    for (let index = 0; index < productsInCart.length; index++) {
        productSnapShotData.push(
                {
                    title: productsInCart[index].product.title,
                    subtitle: productsInCart[index].product.subtitle,
                    price: productsInCart[index].product.price,
                    product_id: productsInCart[index].product.id
                }
        )
        productQuantityMap.set(productsInCart[index].product.id, productsInCart[index].quantity)
        totalPrice += productsInCart[index].product.price*productsInCart[index].quantity
    }


    try {
        const order = await Order.query().insertGraphAndFetch({
            recipient_address : shipping_address,
            recipient : recipient,
            user_id : userId,
            total_price : totalPrice,
            orderStatus : {
                status : "In progress"
            }
        }).select('id')

        const productSnapShots = await ProductSnapshot.query().insertGraphAndFetch(productSnapShotData)

        productSnapShots.map(async (item)=>{
            await OrderItem.query().insertGraphAndFetch({
                order_id : order.id,
                product_id : item.id,
                quantity : productQuantityMap.get(item.product_id)
            })
        })

        await Cart.query().delete().where('user_id', userId).andWhere('selected', true)


    } catch (e) {
        console.log(e)
        next(new DatabaseError('DB Error: Error during orders insertion'))
    }
    handleSuccessResponse(res, 201, 'Created')
}


export async function getOrders(req: Request, res: Response<Order[]>, next: NextFunction) {
    if (!req.user) {
        return next(new AuthorizationError("Unauthorized"));
    }
    const userId = req.user.id;
    try {
        const orders = await Orders.query()
            .where('user_id', '=', userId)
            .select('created_at', 'updated_at', 'total_price', 'delivery_price')
            .withGraphFetched('[orderItems, recipient, orderStatus, recipient_address.[city, region, postOffice]]')
            .modifyGraph('orderItems', (builder) => {
                builder.select('order_items.quantity', 'order_items.id as order_item_id', 'title', 'subtitle', 'price', 'product_snapshot.product_id as prod_id')
            })
            .modifyGraph('recipient', (builder)=>{
                builder.select('id', 'first_name', 'last_name', 'phone')
            })
            .modifyGraph('recipient_address', (builder) => {
                builder.select('id', 'address'); // Fetch specific fields
            })
            .modifyGraph('recipient_address.city', (builder) => {
                builder.select('name'); // Only select the 'name' field
            })
            .modifyGraph('recipient_address.region', (builder) => {
                builder.select('name'); // Only select the 'name' field
            })
            .modifyGraph('recipient_address.postOffice', (builder) => {
                builder.select('address as name'); // Select 'address' but return it as 'name' for consistency
            })

        res.send(orders)

    } catch (e) {
        console.log(e)
        next(new DatabaseError('DB Error: Error during fetching orders'))
    }

}
