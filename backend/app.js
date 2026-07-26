import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { authorizeUser } from "./middlewares/auth.js";
import userRoute from "./routes/user/main.js";
import authorRoute from "./routes/author/main.js";

const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use(cors());

function verifyOrigin(ctx) {
  const origin = ctx.headers.origin;
  if (!originIsValid(origin)) return false;
  return origin;
}

function originIsValid(origin) {
  return validOrigins.indexOf(origin) != -1;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorizeUser);
app.use("/user", userRoute);
app.use("/author", authorRoute);
