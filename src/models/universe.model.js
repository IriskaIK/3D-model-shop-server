const {Model} = require('objection')
const Image = require("./image.model");
const Tag = require("./tag.model");

class Universe extends Model{
    static get tableName(){
        return 'universe'
    }
    static get relationMappings(){

        const Image = require('./image.model')

        return {

            images : {
                relation : Model.HasOneRelation,
                modelClass : Image,
                join:{
                    from : 'universe.image_id',
                    to : 'images.id'
                }
            },

        }
    }


    
}

module.exports = Universe