const Product = require('../models/product.model')
const Universe = require('../models/universe.model') 
const { ProductQueryConstructor } = require('../services/productsServices/productsQueryBuilder.services')
const {generateQueryParams} = require('../utils/productQueryGenerator.util')

module.exports = {
    getProducts : async (req, res) =>{
        let {offset, inStock, universe, tags, price, orderBy} = generateQueryParams(req.body)
        let products = new ProductQueryConstructor(Product, Universe).isInStock(inStock).offset(offset)

        //store and serve images 
        if(universe){
            products.universePublicId(universe)
        }
        if(tags){
            products.tagPublicId(tags)
        }
        if(price){
            products.price(price.min, price.max)
        }
        if(orderBy){
            products.orderBy(orderBy)
        }


        products = await products.execute()
        
        res.json({
            products : products,
            offset : +offset + 20
        })
            

        
    },
    getProductByID : async (req, res) => {

        let product = await new ProductQueryConstructor(Product, Universe).productPublicId(req.params.id).execute()

        res.json(product)




    }
}