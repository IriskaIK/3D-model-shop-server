const { Model } = require('objection');
const User = require("./user.model");
const Order = require("./order.model");

class Recipient extends Model {
    static get tableName() {
        return 'recipient';
    }
    static get relationMappings() {
        return {
            order : {
                relation: Model.HasOneRelation,
                modelClass: Order,
                join: {
                    from: "recipient.id",
                    to: "orders.recipient_id",
                }
            }
        };
    }

}

module.exports = Recipient;