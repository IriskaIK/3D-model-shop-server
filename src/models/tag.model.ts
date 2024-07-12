import { Model, RelationMappings } from 'objection';
import Product from './product.model'; // Assuming correct path for Product model

interface Tag {
    id: number;
    publicId: string;
    title: string;
    created_at: string;
    updated_at: string;
}


class Tag extends Model implements Tag{
    static get tableName(): string {
        return 'tags';
    }

    static get relationMappings(): RelationMappings {
        return {
            products: {
                relation: Model.ManyToManyRelation,
                modelClass: Product,
                join: {
                    from: 'tags.id',
                    through: {
                        from: 'tag_product.tag_id',
                        to: 'tag_product.product_id'
                    },
                    to: 'products.id'
                }
            }
        };
    }
}

export default Tag;
