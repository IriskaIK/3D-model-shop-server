import { Model, RelationMappings } from 'objection';
import Image from './image.model'; // Assuming correct path for Image model
import Product from './product.model'; // Assuming correct path for Product model
import ShippingAddress from './shippingAddress.model';
import Cart from "./cart.model";
import Wishlist from "./wishlist.model"; // Assuming correct path for ShippingAddress model


interface User {
    id: number;
    shippingAddress_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    image_id : number;
    createdAt: string;
    updatedAt: string;
    shipping_address : ShippingAddress;
    avatar : Image;
    cart : Product[];
    wishlist : Product[];
}

class User extends Model implements User{
    static get tableName(): string {
        return 'users';
    }

    static get relationMappings(): RelationMappings {
        return {
            avatar: {
                relation: Model.BelongsToOneRelation,
                modelClass: Image,
                join: {
                    from: 'users.image_id',
                    to: 'images.id'
                }
            },
            shipping_address: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShippingAddress,
                join: {
                    from: 'users.shippingAddress_id',
                    to: 'shippingAddress.id'
                }
            },
            wishlist: {
                relation: Model.ManyToManyRelation,
                modelClass: Product,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'wishlist.user_id',
                        to: 'wishlist.product_id'
                    },
                    to: 'products.id'
                }
            },
            cart: {
                relation: Model.ManyToManyRelation,
                modelClass: Product,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'cart.user_id',
                        to: 'cart.product_id'
                    },
                    to: 'products.id'
                }
            }
        };
    }
}

export default User;
