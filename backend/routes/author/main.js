import { Router } from "express";
import authRoute from "./authRoute.js";
import postsRoute from "./postsRoute.js";
import usersRoute from "./usersRoute.js";

const authorRoute = Router();

authorRoute.use("/auth", authRoute);
authorRoute.use("/posts", postsRoute);
authorRoute.use("/users", usersRoute);

export default authorRoute;
