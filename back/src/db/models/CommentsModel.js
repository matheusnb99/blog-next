import { Model } from "objection";
import PostModel from "./PostModel.js";
import UserModel from "./UserModel.js";

class CommentsModel extends Model {
  static tableName = "comments";
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
      posts: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: "comments.post_id",
          to: "posts.id",
        },
      },
    };
  }
}
export default CommentsModel;
