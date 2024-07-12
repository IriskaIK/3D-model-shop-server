import { Model, RelationMappings } from 'objection';
import Recipient from './recipient.model';
import ShippingAddress from './shippingAddress.model';
import User from './user.model';
import ProductSnapshot from './productSnapshot.model';
import OrderItem from "./orderItem.model";

interface Order{
    id : number,
    shippingAddress_id: number,
    status : string,
    recipient_id : number,
    created_at : string,
    updated_at : string,
    user_id : number,
    shipping_address : Partial<ShippingAddress>,
    recipient : Partial<Recipient>,
    user : User,
    orderItems : Partial<ProductSnapshot>[],
}


class Order extends Model implements Order{
    static get tableName(): string {
        return 'orders';
    }

    static get relationMappings(): RelationMappings {
        return {
            recipient: {
                relation: Model.BelongsToOneRelation,
                modelClass: Recipient,
                join: {
                    from: 'orders.recipient_id',
                    to: 'recipient.id'
                }
            },
            shipping_address: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShippingAddress,
                join: {
                    from: 'orders.shipping_address_id',
                    to: 'shippingAddress.id'
                }
            },
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            },
            orderItems: {
                relation: Model.ManyToManyRelation,
                modelClass: ProductSnapshot,
                join: {
                    from: 'orders.id',
                    through: {
                        from: 'order_items.order_id',
                        to: 'order_items.product_id'
                    },
                    to: 'product_snapshot.id'
                }
            }
        };
    }
}

export default Order;
