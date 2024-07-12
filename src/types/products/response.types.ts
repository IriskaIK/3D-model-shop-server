import Product from "../../models/product.model";

export interface IManyProductsResponse {
    products: Product[];
    offset : number;
}