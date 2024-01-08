const { Model } = require("objection");
const User = require("./user.model");
const Product = require("./product.model");

class Image extends Model {
  static get tableName() {
    return "images";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "images.id",
          to: "users.image_id",
        },
      },
      product : {
        relation : Model.ManyToManyRelation,
        modelClass : Product,
        join : {
          from : 'images.id',
          through : {
            from : 'image_product.image_id',
            to : 'image_product.product_id'

          },
          to: 'products.id'
        }
      }
    };
  }
}

module.exports = Image;
