import { Router } from "express";

import postsRoute from "./postsRoute.js";
import authRoute from "./authRoute.js";
import commentsRoute from "./commentsRoute.js";
import usersRoute from "./usersRoute.js";

const userRoute = Router();

userRoute.use("/posts", postsRoute);
userRoute.use("/auth", authRoute);
userRoute.use("/comments", commentsRoute);
userRoute.use("/users", usersRoute);

export default userRoute;
