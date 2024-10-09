import {QueryBuilder} from "objection";
import Product from "../../models/product.model";
import Category from "../../models/category.model";
import Tag from "../../models/tag.model";
import Image from "../../models/image.model";

import {QueryBuilderBase} from "./queryBuilderBase"
import {IManyProductsRequestBody, OrderByType} from "@/types/products/request.types";


export class ProductsQueryBuilderService extends QueryBuilderBase<Product>{
    private tags: QueryBuilder<Tag>;
    private categories: QueryBuilder<Category>;

    private _isInStock: boolean = true;
    private _orderBy: OrderByType = "high price";
    private _maxPrice: number = 0;
    private _minPrice: number = 0;
    private _tagsIds: number[] | null = [];
    private _categoriesIds: number[] | null = [];

    constructor(queryParams : IManyProductsRequestBody, superUserRequest : boolean = false) {
        super(Product, queryParams);
        this.tags = Tag.query();
        this.categories = Category.query();
        this.setQueryParams(queryParams);
        this.setProductQueryParams(queryParams)
        this.query = this.query
            .withGraphFetched("category")
            .withGraphFetched("tags")
            .withGraphFetched("images")

        if(!superUserRequest){
            this.query = this.query
                .modifiers({
                categorySelectOptions(builder: QueryBuilder<Category>) {
                    builder.select("id", "title", "content");
                },
                tagsSelectOptions(builder: QueryBuilder<Tag>) {
                    builder.select("id", "title");
                },
                imagesSelectOptions(builder: QueryBuilder<Image>) {
                    builder.select("id", "path");
                },
            })
                .select("slug", "title", "subtitle", "content", "price", "isInStock", "id")

        }else{
            this.query = this.query
                .modifiers({
                categorySelectOptions(builder: QueryBuilder<Category>) {},
                tagsSelectOptions(builder: QueryBuilder<Tag>) {},
                imagesSelectOptions(builder: QueryBuilder<Image>) {},
            })
        }



    }
    private setProductQueryParams(queryParams: IManyProductsRequestBody) {
        if (queryParams.inStock !== undefined) {
            this._isInStock = queryParams.inStock;
        }
        if (queryParams.price?.min !== undefined) {
            this._minPrice = queryParams.price.min;
        }
        if (queryParams.price?.max !== undefined) {
            this._maxPrice = queryParams.price.max;
        }
        if (queryParams.tags !== undefined) {
            this._tagsIds = queryParams.tags;
        }
        if (queryParams.category !== undefined) {
            this._categoriesIds = queryParams.category;
        }
        if(queryParams.orderBy !== undefined){
            this._orderBy = queryParams.orderBy;
        }
    }

    private filterProductsByOrder() {
        switch (this._orderBy) {
            case "high price":
                this.setOrderBy('desc', 'price')
                break;
            case "low price":
                this.setOrderBy('asc', 'price')
                break;
            case "name":
                this.setOrderBy('asc', 'title');
                break;
            case "date":
                this.setOrderBy('desc', 'updated_at');
                break;
        }
    }
    private filterProductsByStock() {
        this.query = this.query.where('isInStock', '=', this._isInStock);
    }
    private filterByPrice() {
        if(this._minPrice){
            this.query = this.query
                .where('price', '>', this._minPrice)
        }if(this._maxPrice){
            this.query = this.query
                .where('price', '<', this._maxPrice)
        }

    }


    private async filterProductsByTags() {
        try {
            this.query = this.query
                .whereExists(
                    Product.relatedQuery("tags").where((builder) => {
                        builder.whereIn("tag_id", this._tagsIds as number[]);
                    })
                )
                .withGraphFetched("tags");
        } catch (error) {
            throw new Error("Error fetching products by tags");
        }
    }

    private async filterProductsByCategory() {
        try {
            this.query = this.query.where((builder) => {
                builder.whereIn('category_id', this._categoriesIds);
            });
        } catch (error) {
            throw new Error("Error fetching products by category");
        }
    }

    protected async applyFilters(){
        this.filterProductsByStock();
        this.filterProductsByOrder();
        super.applyFilters();
        if ((this._maxPrice !== 0 || this._minPrice !==0)){
            this.filterByPrice();
        }
        try {
            if (this._tagsIds && this._tagsIds.length > 0) {
                await this.filterProductsByTags();
            }
            if (this._categoriesIds && this._categoriesIds.length > 0) {
                await this.filterProductsByCategory();
            }
        } catch (e) {
            throw new Error("Error fetching products");
        }

    }
    async getProductById(id: number) {
        try {
            return await this.query.findOne('id', "=", id);
        } catch (error) {
            throw new Error("Error fetching product");
        }
    }
}