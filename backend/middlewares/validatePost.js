import { body } from "express-validator";

const validatePost = [
  body("title").trim().notEmpty().withMessage("Title cannot be blank"),
  body("content").trim().notEmpty().withMessage("Content cannot be blank"),
];

export default validatePost;
