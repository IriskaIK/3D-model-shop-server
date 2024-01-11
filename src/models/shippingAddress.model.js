const {Model} = require('objection');
const User = require('./user.model');
const Order = require('./order.model')
class ShippingAddress extends Model{
    static get tableName(){
        return 'shippingAddress'
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: "shippingAddress.id",
                    to: "users.shippingAddress_id",
                },
            },
            order : {
                relation: Model.HasOneRelation,
                modelClass: Order,
                join: {
                    from: "shippingAddress.id",
                    to: "orders.shipping_address_id",
                }
            }
        };
      }

    
}

module.exports = ShippingAddress