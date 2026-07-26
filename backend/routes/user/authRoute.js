import Router from "express";
import authContoller from "../../controllers/authController.js";

const authRoute = Router();

authRoute.post("/sign-up", authContoller.signUpPost);
authRoute.post("/log-in", authContoller.logInPost);

export default authRoute;
