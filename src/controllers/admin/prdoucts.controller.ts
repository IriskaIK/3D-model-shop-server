import {NextFunction, Response, Request} from "express";
import Product from "@/models/product.model";
import {
    IManyProductsRequest,
    IProductEditRequestBody,
    IProductRequestParam
} from "@/types/admin/products/request.types";
import {ProductsQueryBuilderService} from "@/services/queryBuilder/productsQueryBuilder.service";
import {IManyProductsResponse} from "@/types/admin/products/response.types";

import {ValidationError, DatabaseError, NotFoundError, AuthorizationError} from "@/types/customError.types";
import {handleSuccessResponse} from "@/utils/responseUtils.util";


export async function getProducts(req: Request<{}, {}, IManyProductsRequest>, res: Response<IManyProductsResponse>, next: NextFunction) {
    let {
        offset
    } = req.body
    if(!offset) offset = 0;
    const products = new ProductsQueryBuilderService(req.body, true)
    try{
        res.json({
            products : await products.execute(),
            offset : offset + products.getOffsetLimit()
        })
    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching products."))
    }
}

export async function getProductById(req: Request<IProductRequestParam>, res: Response<Product>, next: NextFunction) {
    const {id} = req.params

    const users = new ProductsQueryBuilderService({}, true)
    try{
        const product = await Product.query().findById(id);
        if (!product) {
            return next(new ValidationError(`Product with id: ${id} not found.`))
        }
        res.send(await users.getProductById(id))
    }catch (e){
        next(new DatabaseError("DB Error: Error during fetching product."))
    }
}

export async function updateProductById(req: Request<IProductRequestParam, {}, IProductEditRequestBody>, res: Response, next: NextFunction) {

}

export async function deleteProductById(req: Request<IProductRequestParam>, res: Response, next: NextFunction) {
    const {id} = req.params;
    if(id){
        try {
            const product = await Product.query().findById(id);

            if (!product) {
                return next(new ValidationError(`Product with id: ${id} not found.`))
            }

            await Product.query().delete().where('id', id)
            handleSuccessResponse(res, 200, `Product with id: ${id} deleted successfully.`)
        }catch (e){
            next(new DatabaseError("DB Error: Error during deleting product."))
        }
    }
}