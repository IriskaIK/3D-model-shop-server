const { Model } = require('objection');

class Wishlist extends Model {
    static get tableName() {
        return 'wishlist';
    }
}

module.exports = Wishlist;