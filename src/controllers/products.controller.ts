import {NextFunction, Response, Request} from "express";
import {IManyProductsRequestBody, IProductsRequestParam} from "@/types/products/request.types";
import {IManyProductsResponse} from "@/types/products/response.types";
import Category from "../models/category.model";
import Product from "../models/product.model";
import Tag from "../models/tag.model";
import {ProductsQueryBuilderService} from "@/services/queryBuilder/productsQueryBuilder.service";

import {ValidationError, DatabaseError, NotFoundError, AuthorizationError} from "@/types/customError.types";


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
        next(new DatabaseError("DB Error: Error during fetching products."))
    }
}
export async function getProductByID(req : Request<IProductsRequestParam>, res : Response<Product>, next: NextFunction){
    const {id} = req.params
    const products = new ProductsQueryBuilderService({})
    try{
        const product = await Product.query().findById(id);

        if (!product) {
            return next(new ValidationError(`Product with id: ${id} not found.`))
        }
        res.send(await products.getProductById(id))
    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching product."))
    }
}

export async function getTags(req : Request, res : Response<Tag[]>, next: NextFunction){
    try{
        res.send( await Tag.query().select('id', 'title'))
    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching tags."))
    }
}
export async function getCategories(req : Request, res : Response<Category[]>, next: NextFunction){
    try{
        res.send( await Category.query()
            .select('id', 'title', 'content')
            .withGraphFetched('images(imagesSelectOptions)')
            .modifiers({
                    imagesSelectOptions(builder){
                        builder.select('filename', 'path')
                    }
                }
            ))
    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching categories."))
    }
}