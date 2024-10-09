import {Model, QueryContext, RelationMappings} from 'objection';
import User from './user.model'; // Assuming correct path for User model
import Order from './order.model';
import PostOffice from "@/models/postOffice.model";
import City from "@/models/city.model";
import Region from "@/models/region.model"; // Assuming correct path for Order model

interface ShippingAddress {
    id: number;
    full_address: string;
    region_id : number;
    city_id : number;
    postOffice_id : number;
    city : City;
    region : Region;
    postOffice : PostOffice;
}


class ShippingAddress extends Model implements ShippingAddress{
    static get tableName(): string {
        return 'shippingAddress';
    }
    // async $beforeInsert(queryContext: QueryContext) {
    //     await super.$beforeInsert(queryContext);
    // }

    async $beforeUpdate(opt: any, queryContext: QueryContext) {
        await super.$beforeUpdate(opt, queryContext);
        if (this.region_id || this.city_id || this.postOffice_id) {
            const region = this.region_id ? await Region.query().findById(this.region_id) : null;
            const city = this.city_id ? await City.query().findById(this.city_id) : null;
            const postOffice = this.postOffice_id ? await PostOffice.query().findById(this.postOffice_id) : null;

            const regionName = region ? region.name : '';
            const cityName = city ? city.name : '';
            const postOfficeName = postOffice ? postOffice.address : '';

            this.full_address = `${regionName}, ${cityName}, ${postOfficeName}`;
        }
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
            },
            region: {
                relation: Model.BelongsToOneRelation,
                modelClass: Region,
                join: {
                    from: 'shippingAddress.region_id',
                    to: 'regions.id',
                },
            },
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: City,
                join: {
                    from: 'shippingAddress.city_id',
                    to: 'cities.id',
                },
            },
            postOffice: {
                relation: Model.BelongsToOneRelation,
                modelClass: PostOffice,
                join: {
                    from: 'shippingAddress.postOffice_id',
                    to: 'postOffices.id',
                },
            },
        };
    }
}

export default ShippingAddress;
