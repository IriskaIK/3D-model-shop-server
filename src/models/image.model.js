const { Model } = require("objection");
const User = require("./user.model");

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
    };
  }
}

module.exports = Image;
