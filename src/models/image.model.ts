import { Model, RelationMappings } from 'objection';
import User from './user.model';
import Product from './product.model';

interface Image{
    id : number;
    filename : string;
    path : string;
    created_at: string;
    updated_at: string;
}

class Image extends Model implements Image{
    static get tableName(): string {
        return 'images';
    }

    static get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'images.id',
                    to: 'users.image_id'
                }
            },
            product: {
                relation: Model.ManyToManyRelation,
                modelClass: Product,
                join: {
                    from: 'images.id',
                    through: {
                        from: 'image_product.image_id',
                        to: 'image_product.product_id'
                    },
                    to: 'products.id'
                }
            }
        };
    }
}

export default Image;
