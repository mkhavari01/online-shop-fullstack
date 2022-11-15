import express from "express";
import { fetchOrders, createOrder } from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.get("/orders", fetchOrders);

adminRouter.post("/orders/create", createOrder);

export { adminRouter };
