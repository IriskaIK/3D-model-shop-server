import {Model, OrderByDirection, QueryBuilder} from "objection";

interface IBaseQueryParams {
    offset?: number;
    id?: number;
    orderByDirection?: OrderByDirection;
}


export class QueryBuilderBase<T extends Model>{
    protected query : QueryBuilder<T, T[]>

    private _offset : number = 0;
    private _id: number | undefined = undefined;
    private _offsetLimit : number = 20;
    protected _orderByDirection : OrderByDirection = 'desc'
    protected _orderByColumn : string = 'id'

    constructor(modelClass : typeof Model, queryParams: IBaseQueryParams) {
        this.query = modelClass.query() as unknown as QueryBuilder<T, T[]>;
    }
    setQueryParams(queryParams: IBaseQueryParams): void {
        if (queryParams.offset !== undefined) {
            this._offset = queryParams.offset;
        }
        if (queryParams.id !== undefined) {
            this._id = queryParams.id;
        }
        if (queryParams.orderByDirection !== undefined) {
            this._orderByDirection = queryParams.orderByDirection;
        }
    }
    getOffsetLimit(): number {
        return this._offset;
    }

    setOffset(offset: number): this {
        this._offset = offset;
        return this;
    }

    setID(id: number): this {
        this._id = id;
        return this;
    }

    setOrderBy(OrderByDirection: OrderByDirection, orderByColumn : string): this {
        this._orderByDirection = OrderByDirection;
        this._orderByColumn = orderByColumn
        return this;
    }
    protected applyFilters(): void {
        if (this._id !== undefined) {
            this.query = this.query.where('id', this._id);
        }
        this.query = this.query.offset(this._offset).limit(this._offsetLimit).orderBy(this._orderByColumn, this._orderByDirection);
    }

    async execute(): Promise<T[]> {
        this.applyFilters();
        try {
            return await this.query;
        } catch (error) {
            throw new Error("Error fetching data");
        }
    }
}