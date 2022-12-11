import express from "express";
import {
  fetchUsers,
  signup,
  login,
  fetchFavorites,
  fetchByCategory,
  paymentPage,
} from "../controllers/index.js";

const userRouter = express.Router();

userRouter.get("/", fetchUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.get("/favorite", fetchFavorites);
userRouter.get("/categories/:id", fetchByCategory);

userRouter.get("/payment", paymentPage);

export { userRouter };
