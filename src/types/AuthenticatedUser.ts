// import User from "../models/user.model";
// import Admin from "../models/admin.model";

import Role from "../models/role.model";
import ShippingAddress from "../models/shippingAddress.model";
import Image from "../models/image.model";
import Product from "../models/product.model";

interface UserBase{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface Admin extends UserBase{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role_id : number;
    type : 'admin';
}
export interface User extends UserBase{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;

    shippingAddress_id: number;
    image_id : number;
    created_at: string;
    updated_at: string;
    phone: string;
    shipping_address : ShippingAddress;
    avatar : Image;
    cart : Product[];
    wishlist : Product[];

    type : 'user';
}

export type AuthenticatedUser = User | Admin;