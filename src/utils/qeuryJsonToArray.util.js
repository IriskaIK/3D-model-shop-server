module.exports = {
    queryJsonToIdArray(query){
        let dataObj = JSON.parse(JSON.stringify(query))
        let newArr = []
        for(let i = 0; i < dataObj.length; i++){
            newArr.push(dataObj[i]['id'])
        }
        return newArr
    }
}