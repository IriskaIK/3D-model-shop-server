import { Model, RelationMappings, QueryContext } from 'objection';
import Category from './category.model';
import Tag from './tag.model';
import Image from './image.model';
import User from './user.model';

const slugify = require('slugify');
import crypto from 'crypto';
interface Product{
    id : number;
    slug : string;
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

    async $beforeInsert(queryContext: QueryContext) {
        await super.$beforeInsert(queryContext);
        this.slug = await this.generateUniqueSlug();
    }

    async $beforeUpdate(opt: any, queryContext: QueryContext) {
        await super.$beforeUpdate(opt, queryContext);
        this.slug = await this.generateUniqueSlug();
    }

    private async generateUniqueSlug(): Promise<string> {
        const baseSlug = slugify(`${this.title} ${this.subtitle}`, {
            lower: true,
            strict: true,
            replacement: '-',
        });

        const hash = crypto.createHash('md5').update(`${this.title}-${this.subtitle}-${Date.now()}`).digest('hex').substring(0, 6)
        return `${baseSlug}-${hash}`;
    }
}
export default Product;
