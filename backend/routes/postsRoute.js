import { Router } from "express";
import postsController from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.get("/:postId", postsController.getPostsById);

export default postsRouter;
