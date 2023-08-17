
const {Model} = require('objection')

class Tag extends Model{
    static get tableName(){
        return 'tags'
    }

    static get relationMappings(){
        const Product = require('./product.model')
        return { 

            tags : {
                relation : Model.ManyToManyRelation,
                modelClass : Product,
                join : {
                    from : 'tags.id',
                    through : {
                        from : 'tag_product.tag_id',
                        to : 'tag_product.product_id'

                    },
                    to: 'products.id'
                }
            }
        }
    }
}

module.exports = Tag