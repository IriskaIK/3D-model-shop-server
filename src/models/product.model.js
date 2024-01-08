const {Model} = require('objection')

class Product extends Model{
    static get tableName(){
        return 'products'
    }

    static get relationMappings(){
        const Universe = require('./universe.model')
        const Tag = require('./tag.model')
        const Image = require('./image.model')
        const User = require('./user.model')

        return { 
            universe : {
                relation : Model.HasOneRelation,
                modelClass : Universe,
                join:{
                    from : 'products.universe_id',
                    to : 'universe.id'
                }
            },
            images : {
                relation : Model.ManyToManyRelation,
                modelClass : Image,
                join:{
                    from : 'products.id',
                    through: {
                        from : 'image_product.product_id',
                        to : 'image_product.image_id'
                    },
                    to : 'images.id'
                }
            },
            tags : {
                relation : Model.ManyToManyRelation,
                modelClass : Tag,
                join : {
                    from : 'products.id',
                    through : {
                        from : 'tag_product.product_id',
                        to : 'tag_product.tag_id'

                    },
                    to: 'tags.id'
                }
            },
            wishlist : {
                relation : Model.ManyToManyRelation,
                modelClass : User,
                join : {
                    from : 'products.id',
                    through : {
                        from : 'wishlist.product_id',
                        to : 'wishlist.user_id'
                    },
                    to : 'users.id'
                }
            },
            cart : {
                relation : Model.ManyToManyRelation,
                modelClass : User,
                join : {
                    from : 'products.id',
                    through : {
                        from : 'cart.product_id',
                        to : 'cart.user_id'
                    },
                    to : 'users.id'
                }
            }
        }
    }
    
}

module.exports = Product