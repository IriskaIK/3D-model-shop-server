const {Model} = require('objection');
const User = require('./user.model');

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
        };
      }

    
}

module.exports = ShippingAddress