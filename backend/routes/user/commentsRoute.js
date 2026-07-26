import { Router } from "express";
import commentsController from "../../controllers/user/commentsController.js";

const commentsRoute = Router();

commentsRoute.delete("/:commentId", commentsController.commentDelete);

export default commentsRoute;
