const {Model} = require('objection')

class Order extends Model{
    static get tableName(){
        return 'orders'
    }
    static get relationMappings(){

        const Recipient = require('./recipient.model')
        const ShippingAddress = require('./shippingAddress.model')
        const User = require('./user.model')
        const ProductSnapshot = require('./productSnapshot.model')

        return {

            recipient : {
                relation : Model.BelongsToOneRelation,
                modelClass : Recipient,
                join:{
                    from : 'orders.recipient_id',
                    to : 'recipient.id'
                }
            },
            shipping_address : {
                relation: Model.BelongsToOneRelation,
                modelClass : ShippingAddress,
                join: {
                    from: 'orders.shipping_address_id',
                    to: 'shippingAddress.id'
                }
            },
            user : {
                relation : Model.HasOneRelation,
                modelClass: User,
                join:{
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            },
            orderItems : {
                relation : Model.ManyToManyRelation,
                modelClass : ProductSnapshot,
                join : {
                    from : 'orders.id',
                    through : {
                        from : 'order_items.order_id',
                        to : 'order_items.product_id'

                    },
                    to: 'product_snapshot.id'
                }
            }

        }
    }



}

module.exports = Order