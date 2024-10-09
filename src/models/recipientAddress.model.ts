import Region from "@/models/region.model";
import City from "@/models/city.model";
import PostOffice from "@/models/postOffice.model";
import {Model, QueryContext, RelationMappings} from "objection";
import generateAddress from "@/utils/generateAddress.util";


interface RecipientAddress {
    id : number;
    address : string;

    region : Region;
    city : City;
    postOffice : PostOffice;

    region_id : number;
    city_id : number;
    postOffice_id : number;
}


class RecipientAddress extends Model implements RecipientAddress {
    static get tableName() : string {
        return 'recipient_address';
    }

    async $beforeInsert(queryContext: QueryContext) {
        await super.$beforeInsert(queryContext);
        this.address = await generateAddress(this.region_id, this.city_id, this.postOffice_id)
    }

    static get relationMappings() : RelationMappings {
        return {
            region: {
                relation: Model.BelongsToOneRelation,
                modelClass: Region,
                join: {
                    from: 'recipient_address.region_id',
                    to: 'regions.id',
                },
            },
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: City,
                join: {
                    from: 'recipient_address.city_id',
                    to: 'cities.id',
                },
            },
            postOffice: {
                relation: Model.BelongsToOneRelation,
                modelClass: PostOffice,
                join: {
                    from: 'recipient_address.postOffice_id',
                    to: 'postOffices.id',
                },
            },
        }
    }
}
export default RecipientAddress;