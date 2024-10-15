import {Model, QueryContext, RelationMappings} from "objection";
import Order from "@/models/order.model";

interface OrderStatus {
    id : number;
    status : string;
    orders : Order[]
}


class OrderStatus extends Model implements OrderStatus {
    static get tableName() : string {
        return 'order_status';
    }

    static get relationMappings() : RelationMappings {
        return {
        }
    }
}
export default OrderStatus;