import { Router } from "express";
import postsController from "../../controllers/author/postsController.js";

const postsRoute = Router();

postsRoute.get("/", postsController.myPostsGet);
postsRoute.post("/", postsController.createNewPost);
postsRoute.get("/:postId", postsController.getPostById);
postsRoute.delete("/:postId", postsController.postDelete);
postsRoute.put("/:postId/edit", postsController.editPostPut);
postsRoute.put("/:postId/publish", postsController.publishPut);
postsRoute.post("/:postId/like", postsController.likePost);
postsRoute.post("/:postId/comment", postsController.commentPost);
postsRoute.delete("/:postId/comment/:commentId", postsController.commentDelete);

export default postsRoute;
