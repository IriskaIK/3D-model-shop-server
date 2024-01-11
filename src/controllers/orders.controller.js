const Orders = require('../models/order.model')
const ProductSnapshot = require('../models/productSnapshot.model')
const OrderItem = require('../models/orderItem.model')
const Product = require('../models/product.model')
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
module.exports = {


    createOrder : async (req, res) =>{
        const user_id = req.user.id
        const {recipient, shipping_address} = req.body
        //TODO: validate body params and make quantity field in response
        let productsInCart
        try{
            productsInCart = await User.query()
                .findOne('id', '=', user_id)
                .select('first_name')
                .withGraphFetched('cart')
        }catch (e) {
            res.status(404).send({msg:"cart is empty"})
        }
        let products = productsInCart.cart


        let productSnapShotData = []
        for(let index = 0; index < products.length; index++){

            productSnapShotData.push({
                title : products[index].title,
                subtitle : products[index].subtitle,
                price : products[index].price,
                currency : products[index].currency,
                product_id : products[index].id
            })

        }

        let orderData = {
            recipient : recipient,
            shipping_address : shipping_address,
            status : 'in progress',
            user_id : user_id,
            orderItems : productSnapShotData
        }
        try{
            const order = await Orders.query().insertGraph(orderData)
            for(let i = 0; i<products.length; i++){
                const deletedProduct = await Cart.query()
                    .delete()
                    .where('product_id', products[i].id)
                    .andWhere('user_id', user_id)
            }
        }catch (e) {
            console.log(e)
            res.status(500).send({msg: "Something went wrong"})
            return
        }



        res.status(201).send({msg:'created'})

    },

    getOrders : async (req, res)=>{
        const user_id = req.user.id
        try {
            const orders = await Orders.query()
                .where('user_id', '=', user_id)
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
            res.status(500).send({msg:"Something went wrong"})
        }

    },


}