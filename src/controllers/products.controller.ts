import {NextFunction, Response, Request} from "express";
import {IManyProductsRequestBody, IProductsRequestParam} from "../types/products/request.types";
import {IManyProductsResponse} from "../types/products/response.types";
import Category from "../models/category.model";
import Product from "../models/product.model";
import Tag from "../models/tag.model";
import {ProductsQueryBuilderService} from "../services/queryBuilder/productsQueryBuilder.service";



export async function getProducts(req : Request<{}, {}, IManyProductsRequestBody>, res : Response<IManyProductsResponse>, next: NextFunction){
    let {
        offset,
    } = req.body
    if(!offset) offset = 0
    const products = new ProductsQueryBuilderService(req.body)

    try {
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
    const products = new ProductsQueryBuilderService({})
    try{
        res.send(await products.getProductByPublicId(id))
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