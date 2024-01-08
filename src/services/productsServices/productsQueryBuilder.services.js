const { json } = require("body-parser");
const Product = require("../../models/product.model");
const Universe = require("../../models/universe.model");
const { queryJsonToIdArray } = require("../../utils/qeuryJsonToArray.util");
const Tag = require("../../models/tag.model");


class ProductQueryConstructor{
    constructor(Product, Universe){
        this.tags = Tag.query()
        this.universe = Universe.query()
        this.product = Product.query()
        .select('publicId', 'title', 'subtitle', 'content', 'price', 'isInStock', 'currency') 
        .withGraphFetched('universe(universeSelectOptions)')
        .withGraphFetched('tags(tagsSelectOptions)')
        .withGraphFetched('images(imagesSelectOptions)')
        .modifiers(
            {
                universeSelectOptions(builder) {
                    builder.select('publicId', 'title', 'content');
                },
                tagsSelectOptions(builder){
                    builder.select('publicId', 'title');
                },
                imagesSelectOptions(builder){
                    builder.select('filename', 'path')
                }
            }
            
            
        )
        


        this._offset = false
        this._stock = false
        this._universe_pid = null

        this._tags_pid = null


        
    }

    offset(offset){
        this.product = this.product.offset(offset).limit(20)
        this._offset = true 
        return this 
    }

    orderBy(state){
        switch(state.toLowerCase()){
            case 'high price':
                this.product = this.product.orderBy('price', 'desc')
                break
            case 'low price':
                this.product = this.product.orderBy('price', 'asc')
                break
            case 'name':
                this.product = this.product.orderBy('title', 'asc')
                break
            case 'date':
                this.product = this.product.orderBy('updated_at', 'desc')
                break
            
        }
        
        return this
    }


    isInStock(inStock){
        this.product = this.product.where('isInStock', '=', inStock)
        this._inStock = true
        return this
    }

    price(min, max){
        this.product = this.product
        .where('price', '>', min)
        .where('price', '<', max)
        return this
    }

    productPublicId(productPublicId){
        this.product = this.product.where('publicId', '=', productPublicId)
        return this
    }

    async _getProductsByTags(){
        const tags = await this.tags
            .select('id')
            .where((builder) =>
                builder
                .whereIn('publicId', this._tags_pid)
    
            )
            let tags_id = queryJsonToIdArray(tags)
    
        this.product = this.product
        .whereExists(Product.relatedQuery('tags')
        .where((builder) => builder.whereIn('tags.id', tags_id)))
        .withGraphFetched('tags');
    }
    
    tagPublicId(tagPublicId){
        if(Array.isArray(tagPublicId)){
            if(this._tags_pid == null){
                this._tags_pid = tagPublicId
            }else{
                tagPublicId.forEach((el)=>{
                    this._tags_pid.push(el)
                })
                
            }
        }
        else if(typeof tagPublicId === 'string'){
            if(this._tags_pid == null){
                this._tags_pid = [tagPublicId]
            }else{
                this._tags_pid.push(tagPublicId)
            }
        }
        
        return this
    }
    

    universePublicId(universePublicId){
        if(Array.isArray(universePublicId)){
            if(this._universe_pid == null){
                this._universe_pid = universePublicId
            }else{
                universePublicId.forEach((el)=>{
                    this._universe_pid.push(el)
                })
                
            }
        }
        else if(typeof universePublicId === 'string'){
            if(this._universe_pid == null){
                this._universe_pid = [universePublicId]
            }else{
                this._universe_pid.push(universePublicId)
            }
        }
        
        return this
    }

    async _getProductsByUniverse(){

        const universe = await this.universe
            .select('id')
            .where((builder) =>
                builder
                .whereIn('publicId', this._universe_pid)

            )
            let universe_id = queryJsonToIdArray(universe)
            

            this.product.where((builder) =>
                builder
                .whereIn('universe_id', universe_id)

            )
    }



    async execute(){
        

        if(!this._offset){
            this.offset(0)
        }

        if(!this._inStock){
            this.isInStock(true)
        }
            
        if(this._universe_pid){
            await this._getProductsByUniverse()
        }

        if(this._tags_pid){
            await this._getProductsByTags()
        }

        return await this.product
    }

}










module.exports = {ProductQueryConstructor}

