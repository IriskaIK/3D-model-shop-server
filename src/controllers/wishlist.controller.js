const Product = require('../models/product.model')
const Wishlist = require('../models/wishlist.model')
const User = require('../models/user.model')
module.exports = {


    addProductToWishlist : async (req, res) =>{
        const productPublicId = req.body.product_pid

        try {
            const product = await Product.query().findOne("publicId", "=", productPublicId);

            const user_id = req.user.id
            await Wishlist.query().insert({
                product_id : product.id,
                user_id : user_id
            })
            res.status(200)
            res.send({msg:'ok'})

        }catch (e){
            res.status(400)
            res.send({msg:'something went wrong'})
        }

    },


    getProductsInWishlist : async (req, res) => {
        const user_id = req.user.id
        try {
            const productsInWishlist = await User.query()
                .findOne('id', '=', user_id)
                .withGraphFetched('wishlist(wishlistSelectOptions)')
                .modifiers({
                    wishlistSelectOptions(builder){
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
            res.send(productsInWishlist.wishlist)
        }catch (e){
            console.log(e)
            res.status(400)
            res.send({msg:'something went wrong'})

        }

    },


    removerProductFromWishlist : async (req, res)=>{
        const user_id = req.user.id
        const productPublicId = req.body.product_pid

        try {
            const product = await Product.query().findOne("publicId", "=", productPublicId);
            const deletedProduct = await Wishlist.query()
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



}