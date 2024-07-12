import {QueryBuilder} from "objection";
import Product from "../models/product.model"
import Category from "../models/category.model";
import Tag from "../models/tag.model";
import queryJsonToIdArray from "../utils/queryJsonToArray.util";
import {OrderByType} from "../types/products/request.types";
import Image from "../models/image.model";

interface ProductQueryConstructorOptions {
    Product: typeof Product;
    Category: typeof Category;
}

class ProductQueryBuilder {
    private tags: QueryBuilder<Tag>;
    private products: QueryBuilder<Product>;
    private categories: QueryBuilder<Category>;

    private _offset : number = 0;
    private _isInStock : boolean = true;
    private _orderBy : OrderByType = "high price";
    private _maxPrice : number = 0;
    private _minPrice : number = 0;
    private _tagsPublicIds : string[] | null = [];
    private _categoriesPublicIds : string[] | null = [];

    constructor({Product, Category}: ProductQueryConstructorOptions) {
        this.tags = Tag.query()
        this.categories = Category.query()
        this.products = Product.query().select(
            "publicId",
            "title",
            "subtitle",
            "content",
            "price",
            "isInStock",
            "currency"
        )
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
                imagesSelectOptions(builder: QueryBuilder<Image>) { // Assuming `any` for now as `Image` model is not defined
                    builder.select("filename", "path");
                },
            });
    }

    private async filterProductsByTags(){
        try {
            const tags = await this.tags
                .select("id")
                .where((builder) =>{
                    builder.whereIn("publicId", this._tagsPublicIds as string[])
                })

            const tagsId = queryJsonToIdArray(tags)

            this.products = this.products
                .whereExists(
                    Product.relatedQuery("tags").where((builder)=>{
                        builder.whereIn("tags_id", tagsId)
                    })
                )
                .withGraphFetched("tags")


        }catch (error){
            throw new Error("Error fetching products by tags")
        }
    }

    private async filterProductsByCategory(){
        try {
            const categories = await this.categories
                .select('id')
                .where((builder)=>{
                    builder.whereIn('publicId', this._categoriesPublicIds as string[])
                })
            const categoriesId = queryJsonToIdArray(categories)

            this.products = this.products.where((builder)=>{
                builder.whereIn('category_id', categoriesId)
            })
        }catch (error){
            throw new Error("Error fetching products by category")
        }
    }

    private filterProductsByOffset(){
        this.products = this.products.offset(this._offset).limit(20);
    }
    private filterProductsByOrder(){
        switch (this._orderBy) {
            case "high price":
                this.products = this.products.orderBy("price", 'desc')
                break;
            case "low price":
                this.products = this.products.orderBy("price", 'asc')
                break;
            case "name":
                this.products = this.products.orderBy("name", 'asc')
                break;
            case "date":
                this.products = this.products.orderBy("updated_at", 'desc')
                break;
        }
    }
    private filterProductsByStock(){
        this.products = this.products.where('isInStock', '=', this._isInStock)
    }
    private filterByPrice(){
        this.products = this.products
            .where('price', '>', this._minPrice)
            .where('price', '<', this._maxPrice);
    }




    offset(offset: number){
        this._offset = offset
        return this;
    }
    orderBy(orderBy : OrderByType){
        this._orderBy = orderBy;
        return this;
    }
    isInStock(inStock : boolean){
        this._isInStock = inStock;
        return this;
    }
    price(min : number, max : number){
        this._minPrice = min;
        this._maxPrice = max;
        return this;
    }
    tagsPublicIds(tagsIds : string[]){
        this._tagsPublicIds = tagsIds;
    }
    categoriesPublicIds(categoriesIds : string[]){
        this._categoriesPublicIds = categoriesIds;
    }

    async getProducts(){
        console.log(await this.products)
        this.filterProductsByOffset()
        this.filterProductsByStock()
        this.filterProductsByOrder()
        if(this._maxPrice !== 0 && this._minPrice < this._maxPrice) this.filterByPrice()

        try {
            if(this._tagsPublicIds && this._tagsPublicIds.length > 0){
                await this.filterProductsByTags()
            }
            if(this._categoriesPublicIds && this._categoriesPublicIds.length > 0){
                await this.filterProductsByCategory()
            }
        }catch (e){
            throw new Error("Error fetching products")
        }



        try{
            return await this.products;
        }catch (error){
            throw new Error("Error fetching products")
        }


    }
    async getProductByPublicId(publicId : string){
        console.log(await this.products.where('publicId',"=", publicId))
        try {
            return await this.products.findOne('publicId',"=", publicId)
        }catch (error){
            throw new Error("Error fetching product")
        }

    }
}

export {ProductQueryBuilder};