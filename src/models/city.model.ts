import {Model, RelationMappings} from 'objection';
import Region from './region.model';
import PostOffice from './postOffice.model';
import ShippingAddress from './shippingAddress.model';

interface City{
    id : number;
    name : string;
    region_id : number;
}

class City extends Model implements City{
    static get tableName() : string{
        return 'cities';
    }
    static get relationMappings(): RelationMappings {
        return {
            region: {
                relation: Model.BelongsToOneRelation,
                modelClass: Region,
                join: {
                    from: 'cities.region_id',
                    to: 'regions.id',
                },
            },
            postOffices: {
                relation: Model.HasManyRelation,
                modelClass: PostOffice,
                join: {
                    from: 'cities.id',
                    to: 'postOffices.city_id',
                },
            },
            shippingAddresses: {
                relation: Model.HasManyRelation,
                modelClass: ShippingAddress,
                join: {
                    from: 'cities.id',
                    to: 'shippingAddress.city_id',
                },
            },
        }

    };

}

export default City;
