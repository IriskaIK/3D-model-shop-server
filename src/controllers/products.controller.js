const Product = require('../models/product.model')
const Universe = require('../models/universe.model') 
const { ProductQueryConstructor } = require('../services/productsServices/productsQueryBuilder.services')
const {generateQueryParams} = require('../utils/productQueryGenerator.util')

module.exports = {
    getProducts : async (req, res) =>{
        let {offset, inStock, universe_pid, tags} = generateQueryParams(req.body)
        let products = new ProductQueryConstructor(Product, Universe).isInStock(inStock).offset(offset)


        if(universe_pid){
            products.universePublicId(universe_pid)
        }
        if(tags){
            products.tagPublicId(tags)
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