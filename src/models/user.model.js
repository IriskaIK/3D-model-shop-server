const {Model} = require('objection')

class User extends Model{
    static get tableName(){
        return 'users'
    }

    static get relationMappings(){

        const Image = require('./image.model')
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
            }
        }
    }
}

module.exports = User