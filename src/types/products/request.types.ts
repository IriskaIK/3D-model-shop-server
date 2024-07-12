export interface IManyProductsRequestBody {
    offset?: number | undefined;
    inStock? : boolean | undefined;
    category? : string[] | undefined;
    tags? : string[] | undefined;
    price?: {
        min : number;
        max : number;
    };
    orderBy? : OrderByType;
}
export interface IProductsRequestParam{
    id: string;
}


export type OrderByType = "high price" | "low price" | "name" | "date";
