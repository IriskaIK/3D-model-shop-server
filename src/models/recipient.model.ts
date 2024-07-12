import { Model, RelationMappings } from 'objection';
import Order from './order.model'; // Assuming correct path for Order model

interface Recipient{
    id : number,
    first_name: string,
    last_name: string,
    phone: string,
    created_at : string,
    updated_at : string,
    order : Order

}


class Recipient extends Model {
    static get tableName(): string {
        return 'recipient';
    }

    static get relationMappings(): RelationMappings {
        return {
            order: {
                relation: Model.HasOneRelation,
                modelClass: Order,
                join: {
                    from: 'recipient.id',
                    to: 'orders.recipient_id'
                }
            }
        };
    }
}

export default Recipient;
