const { Model } = require('objection');

class OrderItem extends Model {
    static get tableName() {
        return 'order_items';
    }
}

module.exports = OrderItem;