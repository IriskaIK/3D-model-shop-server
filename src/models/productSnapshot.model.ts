import { Model, RelationMappings } from 'objection';
import Product from './product.model';
import Order from './order.model';


interface ProductSnapshot{
    id : number,
    publicId : string,
    title : string,
    subtitle : string,
    price : number,
    currency : string,
    product_id: number
}

class ProductSnapshot extends Model implements ProductSnapshot{
    static get tableName(): string {
        return 'product_snapshot';
    }

    static get relationMappings(): RelationMappings {
        return {
            currentProduct: {
                relation: Model.HasOneRelation,
                modelClass: Product,
                join: {
                    from: 'product_snapshot.product_id',
                    to: 'products.id'
                }
            },
            orders: {
                relation: Model.ManyToManyRelation,
                modelClass: Order,
                join: {
                    from: 'product_snapshot.id',
                    through: {
                        from: 'order_items.product_id',
                        to: 'order_items.order_id'
                    },
                    to: 'orders.id'
                }
            }
        };
    }
}

export default ProductSnapshot;
