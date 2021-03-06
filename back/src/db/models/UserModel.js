import { Model } from "objection"
import CommentsModel from "./CommentsModel.js"
import PostModel from "./PostModel.js"
import RoleModel from "./RoleModel.js"

class UserModel extends Model {
  static tableName = "users"

  // overides default response to not include hash and salt
  $formatJson(json) {
    json = super.$formatJson(json)
    delete json.passwordHash
    delete json.passwordSalt

    return json
  }

  static get relationMappings() {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "users.id",
          to: "comments.userId",
        },
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "users.id",
          to: "posts.userId",
        },
      },
      role: {
        relation: Model.HasOneRelation,
        modelClass: RoleModel,
        join: {
          from: "users.role_id",
          to: "roles.id",
        },
      },
    }
  }
}

export default UserModel
