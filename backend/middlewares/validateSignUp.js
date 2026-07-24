import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

const validateSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be blank")
    .isLength({ max: 20, min: 3 })
    .withMessage("Username must be between 3 and 20 characters")
    .isAlphanumeric()
    .withMessage("Username cannot contain special characters")
    .custom(isUsernameAvailable),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be blank")
    .isEmail()
    .withMessage("Email address is incorrect")
    .custom(isEmailAvailable),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password cannot be blank")
    .isLength({ min: 4 })
    .withMessage("Password must contain at least 4 characters"),
];

async function isUsernameAvailable(value) {
  const user = await prisma.user.findUnique({
    where: {
      username: value,
    },
  });

  if (user) {
    throw new Error("User already exists");
  } else {
    return true;
  }
}

async function isEmailAvailable(value) {
  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (user) {
    throw new Error("Email address is unavailable");
  } else {
    return true;
  }
}

export default validateSignUp;
