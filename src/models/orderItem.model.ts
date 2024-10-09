import {Model, RelationMappings} from 'objection';
import Order from "@/models/order.model";
import ProductSnapshot from "@/models/productSnapshot.model";
import Recipient from "@/models/recipient.model";
import RecipientAddress from "@/models/recipientAddress.model";
import User from "@/models/user.model";
import OrderStatus from "@/models/orderStatus.model";

interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;

    order: Order;
    product: ProductSnapshot
}


class OrderItem extends Model {
    static get tableName(): string {
        return 'order_items';
    }

    static get relationMappings(): RelationMappings {
        return {
            product: {
                relation: Model.HasOneRelation,
                modelClass: ProductSnapshot,
                join: {
                    from: 'order_items.product_id',
                    to: 'product_snapshot.id'
                }
            }
        }
    }
}

export default OrderItem;
