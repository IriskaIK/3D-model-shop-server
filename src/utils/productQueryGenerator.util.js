module.exports = {
    generateQueryParams : (query)=>{
        let {offset, inStock, universe, tags} = query
        let universe_pid = universe
        if(!offset){
            offset = 0
        }
        if(inStock == undefined){
            inStock = true
        }
        if(!universe_pid){
            universe_pid = null
        }
        if(!tags){
            tags = null
        }
        return {offset, inStock, universe_pid, tags}
    }
}