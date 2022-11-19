import express from "express";
import {
  fetchOrders,
  createOrder,
  fetchOneOrder,
  updateOneOrderDelivery,
  fetchCategories,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

// ORDERS ROUTES
adminRouter.get("/orders", fetchOrders);
adminRouter.get("/orders/:id", fetchOneOrder);
adminRouter.patch("/orders/:id", updateOneOrderDelivery);
adminRouter.post("/orders/create", createOrder);

// CATEGORY ROUTES
adminRouter.get("/categories", fetchCategories);

export { adminRouter };
