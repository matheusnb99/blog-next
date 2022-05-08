import { Model } from "objection"
import PostModel from "./PostModel.js"

class CategoryModel extends Model {
  static tableName = "categories"

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    }
  }
}

export default CategoryModel
