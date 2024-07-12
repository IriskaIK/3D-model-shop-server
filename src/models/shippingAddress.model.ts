import { Model, RelationMappings } from 'objection';
import User from './user.model'; // Assuming correct path for User model
import Order from './order.model'; // Assuming correct path for Order model

interface ShippingAddress {
    id: number;
    region : string;
    city : string;
    postOffice : string;
}


class ShippingAddress extends Model implements ShippingAddress{
    static get tableName(): string {
        return 'shippingAddress';
    }

    static get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'shippingAddress.id',
                    to: 'users.shippingAddress_id'
                }
            },
            order: {
                relation: Model.HasOneRelation,
                modelClass: Order,
                join: {
                    from: 'shippingAddress.id',
                    to: 'orders.shipping_address_id'
                }
            }
        };
    }
}

export default ShippingAddress;
