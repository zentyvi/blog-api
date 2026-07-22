import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import postsRouter from "./routes/postsRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRouter);
app.use("/auth", authRoute);
