import { Model } from 'objection';
interface Cart{
    id: number;
    product_id: number;
    user_id: number;
    quantity: number;
}


class Cart extends Model implements Cart{
    static get tableName(): string {
        return 'cart';
    }
}

export default Cart;
