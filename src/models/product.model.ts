import { Model, RelationMappings } from 'objection';
import Category from './category.model';
import Tag from './tag.model';
import Image from './image.model';
import User from './user.model';

interface Product{
    id : number;
    publicId : string;
    title : string;
    subtitle : string;
    content : string;
    price : number;
    currency : string;
    isInStock : boolean;
    category_id : number;
    created_at : string;
    updated_at : string;
    category : Category;
    tags : Tag[];
    images : Image[];
}


class Product extends Model implements Product{
    static get tableName(): string {
        return 'products';
    }

    static get relationMappings(): RelationMappings {
        return {
            category: {
                relation: Model.HasOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.category_id',
                    to: 'category.id'
                }
            },
            images: {
                relation: Model.ManyToManyRelation,
                modelClass: Image,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'image_product.product_id',
                        to: 'image_product.image_id'
                    },
                    to: 'images.id'
                }
            },
            tags: {
                relation: Model.ManyToManyRelation,
                modelClass: Tag,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'tag_product.product_id',
                        to: 'tag_product.tag_id'
                    },
                    to: 'tags.id'
                }
            },
            wishlist: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'wishlist.product_id',
                        to: 'wishlist.user_id'
                    },
                    to: 'users.id'
                }
            },
            cart: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'cart.product_id',
                        to: 'cart.user_id'
                    },
                    to: 'users.id'
                }
            }
        };
    }
}

export default Product;
