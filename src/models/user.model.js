const {Model} = require('objection')

class User extends Model{
    static get tableName(){
        return 'users'
    }

    static get relationMappings(){

        const Image = require('./image.model')
        const Product = require('./product.model')
        const ShippingAddress = require('./shippingAddress.model')
        return { 
            avatar : {
                relation : Model.BelongsToOneRelation,
                modelClass : Image,
                join:{
                    from : 'users.image_id',
                    to : 'images.id'
                }
            },
            shipping_address : {
                relation : Model.BelongsToOneRelation,
                modelClass : ShippingAddress,
                join:{
                    from: 'users.shippingAddress_id',
                    to : 'shippingAddress.id'
                }
            },
            wishlist : {
                relation : Model.ManyToManyRelation,
                modelClass : Product,
                join : {
                    from : 'users.id',
                    through : {
                        from : 'wishlist.user_id',
                        to : 'wishlist.product_id'
                    },
                    to : 'products.id'
                }
            },
            cart : {
                relation : Model.ManyToManyRelation,
                modelClass : Product,
                join : {
                    from : 'users.id',
                    through : {
                        from : 'cart.user_id',
                        to : 'cart.product_id'
                    },
                    to : 'products.id'
                }
            }
        }
    }
}

module.exports = User