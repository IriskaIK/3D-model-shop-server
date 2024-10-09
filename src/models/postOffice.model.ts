import { Model, RelationMappings } from 'objection';
import City from './city.model';
import ShippingAddress from './shippingAddress.model';
import User from "@/models/user.model";
import Order from "@/models/order.model";

interface PostOffice{
    id : number;
    address : string;
    city_id : number;
}


class PostOffice extends Model implements PostOffice{

    static get tableName(): string {
        return 'postOffices';
    }

    static get relationMappings(): RelationMappings {
        return {
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: City,
                join: {
                    from: 'postOffices.city_id',
                    to: 'cities.id',
                },
            },
            shippingAddresses: {
                relation: Model.HasManyRelation,
                modelClass: ShippingAddress,
                join: {
                    from: 'postOffices.id',
                    to: 'shippingAddress.postOffice_id',
                },
            },
        };
    }

}

export default PostOffice;
