import { users_delete, users_get_description, users_get_list, users_update } from "../controllers/UserController.js"
import auth from "../middlewares/auth.js"

const usersRoute = ({ app }) => {
  app.get("/users", users_get_list)
  app.get("/users/:userId", auth, users_get_description)
  app.put("/users/:userId", users_update)
  app.delete("/users/:userId", users_delete)
}
export default usersRoute
