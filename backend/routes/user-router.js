import express from "express";
import {
  fetchUsers,
  signup,
  login,
  fetchFavorites,
} from "../controllers/index.js";

const userRouter = express.Router();

userRouter.get("/", fetchUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.get("/favorite", fetchFavorites);

export { userRouter };
