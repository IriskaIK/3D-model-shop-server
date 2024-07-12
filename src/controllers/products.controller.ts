import {NextFunction, Response, Request} from "express";
import {IManyProductsRequestBody, IProductsRequestParam} from "../types/products/request.types";
import {IManyProductsResponse} from "../types/products/response.types";
import {ProductQueryBuilder} from "../services/productQueryBuilder.service";
import Category from "../models/category.model";
import Product from "../models/product.model";
import Tag from "../models/tag.model";



export async function getProducts(req : Request<{}, {}, IManyProductsRequestBody>, res : Response<IManyProductsResponse>, next: NextFunction){
    let {
        offset,
        inStock,
        price,
        orderBy,
        category,
        tags
    } = req.body
    const products = new ProductQueryBuilder({Product, Category})

    try {
        if(offset) {
            products.offset(offset)
        }else{
            offset = 0;
        }
        if(inStock) products.isInStock(inStock)
        if(price) products.price(price.min, price.max)
        if(orderBy) products.orderBy(orderBy)
        if(category) products.categoriesPublicIds(category)
        if(tags) products.tagsPublicIds(tags)

        res.json({
            products : await products.getProducts(),
            offset : offset+20
        })
    }catch (e){
        next(e)
    }
}
export async function getProductByID(req : Request<IProductsRequestParam>, res : Response<Product>, next: NextFunction){
    const {id} = req.params
    const product = new ProductQueryBuilder({Product, Category})
    try{
        res.send(await product.getProductByPublicId(id))
    }catch (e){
        next(e)
    }
}

export async function getTags(req : Request, res : Response<Tag[]>, next: NextFunction){
    try{
        res.send( await Tag.query().select('publicId', 'title'))
    }catch (e){
        next(e)
    }
}
export async function getCategories(req : Request, res : Response<Category[]>, next: NextFunction){
    try{
        res.send( await Category.query()
            .select('publicId', 'title', 'content')
            .withGraphFetched('images(imagesSelectOptions)')
            .modifiers({
                    imagesSelectOptions(builder){
                        builder.select('filename', 'path')
                    }
                }
            ))
    }catch (e){
        next(e)
    }
}