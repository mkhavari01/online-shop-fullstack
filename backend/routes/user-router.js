import express from "express";
import { fetchUsers, signup, login } from "../controllers/index.js";

const userRouter = express.Router();

userRouter.get("/", fetchUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

export { userRouter };
