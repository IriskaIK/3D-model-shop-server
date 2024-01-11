const {Model} = require('objection')

class ProductSnapshot extends Model{
    static get tableName(){
        return 'product_snapshot'
    }

    static get relationMappings(){
        const Product = require('./product.model')
        const Order = require('./order.model')


        return {
            CurrentProduct : {
                relation : Model.HasOneRelation,
                modelClass : Product,
                join : {
                    from : 'product_snapshot.product_id',
                    to: 'products.id'
                }
            },
            orders : {
                relation : Model.ManyToManyRelation,
                modelClass : Order,
                join : {
                    from : 'product_snapshot.id',
                    through : {
                        from : 'order_items.product_id',
                        to : 'product_snapshot.order_id'
                    },
                    to : 'orders.id'
                }
            },

        }
    }

}

module.exports = ProductSnapshot