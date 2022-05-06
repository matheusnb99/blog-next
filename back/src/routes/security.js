import { security_signin, security_signup } from "../controllers/SecurityController.js";

const securityRoute = ({ app }) => {
  app.post("/sign-in", security_signin);
  app.post("/sign-up", security_signup);
};
export default securityRoute;
