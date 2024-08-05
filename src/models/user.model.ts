import {Model, RelationMappings} from 'objection';
import Image from './image.model';
import Product from './product.model';
import ShippingAddress from './shippingAddress.model';
import bcrypt from "bcryptjs";
import {User as IUser} from '../types/AuthenticatedUser'


interface User {
    id: number;
    shippingAddress_id: number;
    image_id: number;
    first_name: string;
    last_name: string;

    email: string;
    password: string;
    phone: string;
    created_at: string;
    updated_at: string;
    shipping_address: ShippingAddress;
    avatar: Image;
    cart: Product[];
    wishlist: Product[];
}

class User extends Model implements IUser {
    type: 'user' = 'user';
    static get tableName(): string {
        return 'users';
    }

    async $beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    verifyPassword(password: string) {
        return bcrypt.compare(password, this.password);
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
