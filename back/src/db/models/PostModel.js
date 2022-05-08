import { Model } from "objection"
import CategoryModel from "./CategoryModel.js"
import CommentsModel from "./CommentsModel.js"
import UserModel from "./UserModel.js"

class PostModel extends Model {
  static tableName = "posts"

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: CategoryModel,
        join: {
          from: "posts.category_id",
          to: "categories.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
    }
  }
}

export default PostModel
