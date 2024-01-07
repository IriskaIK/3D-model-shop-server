module.exports = {
    generateQueryParams : (query)=>{
        let {offset, inStock, universe, tags, price, orderBy} = query
        let universe_pid = universe
        if(!offset){
            offset = 0
        }
        if(inStock === undefined){
            inStock = true
        }
        if(!universe_pid){
            universe_pid = null
        }
        if(!tags){
            tags = null
        }
        if(!price){
            price = {min:1, max:30000}
        }
        if(!orderBy){
            orderBy = null
        }
        return {offset, inStock, universe_pid, tags, price, orderBy}
    }
}