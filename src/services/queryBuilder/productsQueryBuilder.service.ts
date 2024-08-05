import {QueryBuilder} from "objection";
import Product from "../../models/product.model";
import Category from "../../models/category.model";
import Tag from "../../models/tag.model";
import Image from "../../models/image.model";

import {QueryBuilderBase} from "./queryBuilderBase"
import {IManyProductsRequestBody, OrderByType} from "../../types/products/request.types";
import queryJsonToIdArray from "../../utils/queryJsonToArray.util";


export class ProductsQueryBuilderService extends QueryBuilderBase<Product>{
    private tags: QueryBuilder<Tag>;
    private categories: QueryBuilder<Category>;

    private _isInStock: boolean = true;
    private _orderBy: OrderByType = "high price";
    private _maxPrice: number = 0;
    private _minPrice: number = 0;
    private _tagsPublicIds: string[] | null = [];
    private _categoriesPublicIds: string[] | null = [];

    constructor(queryParams : IManyProductsRequestBody) {
        super(Product, queryParams);
        this.tags = Tag.query();
        this.categories = Category.query();
        this.setProductQueryParams(queryParams)
        this.query = this.query
            .select("publicId", "title", "subtitle", "content", "price", "isInStock", "currency")
            .withGraphFetched("category(categorySelectOptions)")
            .withGraphFetched("tags(tagsSelectOptions)")
            .withGraphFetched("images(imagesSelectOptions)")
            .modifiers({
                categorySelectOptions(builder: QueryBuilder<Category>) {
                    builder.select("publicId", "title", "content");
                },
                tagsSelectOptions(builder: QueryBuilder<Tag>) {
                    builder.select("publicId", "title");
                },
                imagesSelectOptions(builder: QueryBuilder<Image>) {
                    builder.select("filename", "path");
                },
            });


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
            this._tagsPublicIds = queryParams.tags;
        }
        if (queryParams.category !== undefined) {
            this._categoriesPublicIds = queryParams.category;
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
                this.setOrderBy('asc', 'name');
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
        this.query = this.query
            .where('price', '>', this._minPrice)
            .where('price', '<', this._maxPrice);
    }


    private async filterProductsByTags() {
        try {
            const tags = await this.tags
                .select("id")
                .where((builder) => {
                    builder.whereIn("publicId", this._tagsPublicIds as string[]);
                });

            const tagsId = queryJsonToIdArray(tags);

            this.query = this.query
                .whereExists(
                    Product.relatedQuery("tags").where((builder) => {
                        builder.whereIn("tag_id", tagsId);
                    })
                )
                .withGraphFetched("tags");
        } catch (error) {
            throw new Error("Error fetching products by tags");
        }
    }

    private async filterProductsByCategory() {
        try {
            const categories = await this.categories
                .select('id')
                .where((builder) => {
                    builder.whereIn('publicId', this._categoriesPublicIds as string[]);
                });
            const categoriesId = queryJsonToIdArray(categories);

            this.query = this.query.where((builder) => {
                builder.whereIn('category_id', categoriesId);
            });
        } catch (error) {
            throw new Error("Error fetching products by category");
        }
    }



    async getProducts() {
        this.applyFilters();
        this.filterProductsByStock();
        this.filterProductsByOrder();
        if (this._maxPrice !== 0 && this._minPrice < this._maxPrice) this.filterByPrice();

        try {
            if (this._tagsPublicIds && this._tagsPublicIds.length > 0) {
                await this.filterProductsByTags();
            }
            if (this._categoriesPublicIds && this._categoriesPublicIds.length > 0) {
                await this.filterProductsByCategory();
            }
        } catch (e) {
            throw new Error("Error fetching products");
        }

        try {
            return await this.query;
        } catch (error) {
            throw new Error("Error fetching products");
        }
    }
    async getProductByPublicId(publicId: string) {
        try {
            return await this.query.findOne('publicId', "=", publicId);
        } catch (error) {
            throw new Error("Error fetching product");
        }
    }
}