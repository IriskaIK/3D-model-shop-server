export interface IManyProductsRequestBody {
    offset?: number | undefined;
    inStock? : boolean | undefined;
    category? : number[] | undefined;
    tags? : number[] | undefined;
    price?: {
        min : number;
        max : number;
    };
    orderBy? : OrderByType;
}
export interface IProductsRequestParam{
    id: number;
}


export type OrderByType = "High price" | "Low price" | "Name" | "Date";
