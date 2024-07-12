import { Model } from 'objection';

class OrderItem extends Model {
    static get tableName(): string {
        return 'order_items';
    }
}

export default OrderItem;
