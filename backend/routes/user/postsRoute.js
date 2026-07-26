import { Router } from "express";
import postsController from "../../controllers/postsController.js";

const postsRoute = Router();

postsRoute.get("/", postsController.getPublishedPosts);
postsRoute.get("/:postId", postsController.getPostsById);
postsRoute.post("/:postId/like", postsController.likePost);
postsRoute.post("/:postId/comment", postsController.commentPost);

export default postsRoute;
