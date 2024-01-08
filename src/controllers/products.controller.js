const Product = require('../models/product.model')
const Universe = require('../models/universe.model')
const Tags = require('../models/tag.model')
const { ProductQueryConstructor } = require('../services/productsServices/productsQueryBuilder.services')
const {generateQueryParams} = require('../utils/productQueryGenerator.util')
const User = require("../models/user.model");

module.exports = {
    getProducts : async (req, res) =>{
        let {offset, inStock, universe_pid, tags, price, orderBy} = generateQueryParams(req.body)
        let products = new ProductQueryConstructor(Product, Universe).isInStock(inStock).offset(offset)

        //store and serve images
        if(universe_pid){

            products.universePublicId(universe_pid)
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




    },

    getTags : async (req, res) =>{
        const tags = await Tags.query()
            .select('publicId', 'title')

        res.send(tags)
        // if(user)res.send(user)
        // else{
        //     res.redirect('/api/auth/login')
        // }
    },

    getUniverses : async (req, res) =>{
        const universes = await Universe.query()
            .select('publicId', 'title', 'content')
            .withGraphFetched('images(imagesSelectOptions)')
            .modifiers({
                    imagesSelectOptions(builder){
                        builder.select('filename', 'path')
                    }
                }
            )
        res.send(universes)
    }
}