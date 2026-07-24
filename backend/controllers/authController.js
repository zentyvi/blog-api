import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import validateSignUp from "../middlewares/validateSignUp.js";

async function signUp(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const result = await prisma.user.createManyAndReturn({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    const user = result[0];

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET || "supersecretkey12345",
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      errors: false,
    });
  } catch (err) {
    next(err);
  }
}

const signUpPost = [validateSignUp, signUp];

async function logInPost(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
    });

    if (!user) {
      return res.status(400).json({
        errors: {
          username: {
            msg: "User does not exist",
          },
        },
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({
        errors: {
          password: {
            msg: "Password is incorrect",
          },
        },
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET || "supersecretkey12345",
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      errors: false,
    });
  } catch (err) {
    next(err);
  }
}

const authContoller = {
  signUpPost,
  logInPost,
};

export default authContoller;
