import { Model, RelationMappings } from 'objection';
import Image from './image.model';
import Tag from './tag.model';

interface Category{
    id: number;
    publicId: string;
    title : string;
    content : string;
    image_id : number;
    created_at: string;
    updated_at: string;
    images : Image;
}

class Category extends Model implements Category{
    static get tableName(): string {
        return 'category';
    }

    static get relationMappings(): RelationMappings {
        return {
            images: {
                relation: Model.HasOneRelation,
                modelClass: Image,
                join: {
                    from: 'category.image_id',
                    to: 'images.id'
                }
            },
        };
    }
}

export default Category;
