import { Router } from "express";
import usersContorller from "../../controllers/user/usersContoller.js";

const usersRoute = Router();

usersRoute.get("/:userId", usersContorller.getUserById);
usersRoute.delete("/:userId", usersContorller.userDelete);

export default usersRoute;
