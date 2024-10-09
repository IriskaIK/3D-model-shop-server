import {Model, RelationMappings} from 'objection';
import Image from "@/models/image.model";
import ShippingAddress from "@/models/shippingAddress.model";
import Product from "@/models/product.model";
import Order from "@/models/order.model";
interface Cart{
    id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    product : Product;
}


class Cart extends Model implements Cart{
    static get tableName(): string {
        return 'cart';
    }

    static get relationMappings(): RelationMappings {
        return {
            product: {
                relation: Model.HasOneRelation,
                modelClass: Product,
                join: {
                    from: 'cart.product_id',
                    to: 'products.id'
                }
            },
        };
    }
}

export default Cart;
