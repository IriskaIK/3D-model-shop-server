import {OrderByType} from "@/types/products/request.types";

export interface IManyProductsRequest {
    offset?: number | undefined;
    inStock? : boolean | undefined;
    category? : number[] | undefined;
    tags? : number[] | undefined;
    price?: {
        min : number;
        max : number;
    };
    orderBy? : OrderByType;
    title? : string | undefined;
}

export interface IProductRequestParam{
    id : number;
}
export interface IProductEditRequestBody{

}