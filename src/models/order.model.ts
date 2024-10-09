import { Model, RelationMappings } from 'objection';
import Recipient from './recipient.model';
import ShippingAddress from './shippingAddress.model';
import User from './user.model';
import ProductSnapshot from './productSnapshot.model';
import OrderItem from "./orderItem.model";
import RecipientAddress from "@/models/recipientAddress.model";
import OrderStatus from "@/models/orderStatus.model";

interface Order{
    id : number,
    shippingAddress_id: number,
    status_id : number  ,
    recipient_id : number,
    created_at : string,
    updated_at : string,
    user_id : number,
    recipient_address : RecipientAddress,
    recipient : Recipient,
    user : User,
    delivery_price : number,
    total_price : number,
    orderItems : ProductSnapshot[],
    orderStatus : OrderStatus
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
            recipient_address: {
                relation: Model.BelongsToOneRelation,
                modelClass: RecipientAddress,
                join: {
                    from: 'orders.recipient_address_id',
                    to: 'recipient_address.id'
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
            },
            orderStatus : {
                relation : Model.BelongsToOneRelation,
                modelClass : OrderStatus,
                join : {
                    from : 'orders.status_id',
                    to: 'order_status.id'
                }
            }
        };
    }
}

export default Order;
