import { Router } from "express";
import usersContorller from "../controllers/usersContoller.js";

const usersRoute = Router();

usersRoute.get("/:userId", usersContorller.getUserById);

export default usersRoute;
