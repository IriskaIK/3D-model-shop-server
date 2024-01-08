const Product = require('../models/product.model')
const Cart = require('../models/cart.model')
const User = require('../models/user.model')
module.exports = {


    addProductToCart : async (req, res) =>{
        const productPublicId = req.body.product_pid
        const user_id = req.user.id

        try {
            const product = await Product.query().findOne("publicId", "=", productPublicId);
                await Cart.query().insert({
                    product_id : product.id,
                    user_id : user_id,
                    quantity : 1
                })
                res.status(200)
                res.send({msg:'ok'})

        }catch (e){
            res.status(400)
            res.send({msg:'something went wrong'})
        }

    },


    getProductsInCart : async (req, res) => {
        const user_id = req.user.id
        try {
            const productsInCart = await User.query()
                .findOne('id', '=', user_id)
                .withGraphFetched('cart(cartSelectOptions)')
                .modifiers({
                    cartSelectOptions(builder){
                            builder.select('publicId','title', 'subtitle', 'content', 'price', 'currency', 'isInStock')
                                .withGraphFetched('universe(universeSelectOptions)')
                                .withGraphFetched('images(imagesSelectOptions)')
                                .modifiers(
                                    {
                                        universeSelectOptions(builder) {
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
            res.send(productsInCart.cart)
        }catch (e){
            res.status(400)
            res.send({msg:'something went wrong'})

        }

    },


    removerProductFromCart : async (req, res)=>{
        const user_id = req.user.id
        const productPublicId = req.body.product_pid

        try {
            const product = await Product.query().findOne("publicId", "=", productPublicId);
            const deletedProduct = await Cart.query()
                .delete()
                .where('product_id', product.id)
                .andWhere('user_id', user_id)
            res.status(200)
            res.send({msg:'ok'})
        }catch (e){
            res.status(400)
            res.send({msg:'something went wrong'})
        }
    },


    updateProductInCart : async (req, res)=>{
        const user_id = req.user.id
        const {product_pid, quantity} = req.body

        try {
            const product = await Product.query().findOne("publicId", "=", product_pid);
            const changedProduct = await Cart.query()
                .patch({quantity : quantity})
                .where('product_id', product.id)
                .andWhere('user_id', user_id)
            res.status(200)
            res.send({msg:'ok'})
        }catch (e){
            console.log(e)
            res.status(400)
            res.send({msg:'something went wrong'})
        }

    },
    getQuantityOfProductInCart: async (req, res)=>{
        const user_id = req.user.id
        const product_id = req.params.id
        try {
            const product = await Product.query().findOne("publicId", "=", product_id);
            const quantity = await Cart.query()
                .select('quantity')
                .where('product_id', product.id)
                .andWhere('user_id', user_id)
            res.status(200)
            res.send(quantity)
        }catch (e){
            console.log(e)
            res.status(400)
            res.send({msg:'something went wrong'})
        }

    }

}