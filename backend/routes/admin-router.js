import express from "express";
import {
  fetchOrders,
  createOrder,
  fetchOneOrder,
  updateOneOrderDelivery,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.get("/orders", fetchOrders);

adminRouter.get("/orders/:id", fetchOneOrder);

adminRouter.patch("/orders/:id", updateOneOrderDelivery);

adminRouter.post("/orders/create", createOrder);

export { adminRouter };
