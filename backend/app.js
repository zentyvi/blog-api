import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import postsRoute from "./routes/postsRoute.js";
import authRoute from "./routes/authRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import { authorizeUser } from "./middlewares/auth.js";

const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorizeUser);
app.use("/posts", postsRoute);
app.use("/auth", authRoute);
app.use("/comments", commentsRoute);
app.use("/users", usersRoute);
