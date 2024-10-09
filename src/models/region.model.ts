import { Model, RelationMappings } from 'objection';
import ShippingAddress from "@/models/shippingAddress.model";
import City from "@/models/city.model";

interface Region {
    id : number;
    name : string;
}

class Region extends Model implements Region {
    static get tableName() : string{
      return 'regions';
    }

    static get relationMappings(): RelationMappings {
        return {
            cities: {
                relation: Model.HasManyRelation,
                modelClass: City,
                join: {
                    from: 'regions.id',
                    to: 'cities.region_id',
                },
            },
            shippingAddresses: {
                relation: Model.HasManyRelation,
                modelClass: ShippingAddress,
                join: {
                    from: 'regions.id',
                    to: 'shippingAddress.region_id',
                },
            },
        }

    };
}

export default Region;
