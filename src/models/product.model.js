const {Model} = require('objection')

class Product extends Model{
    static get tableName(){
        return 'products'
    }

    static get relationMappings(){
        const Universe = require('./universe.model')
        const Tag = require('./tag.model')
        const Image = require('./image.model')

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
                relation : Model.HasOneRelation,
                modelClass : Image,
                join:{
                    from : 'products.image_id',
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
            }
        }
    }
    
}

module.exports = Product