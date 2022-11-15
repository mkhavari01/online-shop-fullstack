import express from "express";
import { fetchUsers, signup, login } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", fetchUsers);
router.post("/signup", signup);
router.post("/login", login);

export { router };
