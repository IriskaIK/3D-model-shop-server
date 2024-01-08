const { Model } = require('objection');

class Cart extends Model {
    static get tableName() {
        return 'wishlist';
    }
}

module.exports = Cart;