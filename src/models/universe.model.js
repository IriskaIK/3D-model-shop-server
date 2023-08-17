const {Model} = require('objection')

class Universe extends Model{
    static get tableName(){
        return 'universe'
    }


    
}

module.exports = Universe