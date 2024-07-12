import { Model } from 'objection';
interface Wishlist{
    id: string;
    product_id: number;
    user_id: number;
}


class Wishlist extends Model implements Wishlist{
    static get tableName(): string {
        return 'wishlist';
    }
}

export default Wishlist;
