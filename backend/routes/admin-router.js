import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import {
  fetchOrders,
  createOrder,
  fetchOneOrder,
  updateOneOrderDelivery,
  fetchCategories,
  fetchProducts,
  updateProducts,
  createProduct,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

// ORDERS ROUTES
adminRouter.get("/orders", fetchOrders);
adminRouter.get("/orders/:id", fetchOneOrder);
adminRouter.patch("/orders/:id", updateOneOrderDelivery);
adminRouter.post("/orders/create", createOrder);

// CATEGORY ROUTES
adminRouter.get("/categories", fetchCategories);

// PRODUCTS ROUTES
adminRouter.get("/products", fetchProducts);
adminRouter.patch("/products/update", updateProducts);
adminRouter.post("/products", upload.single("productImage"), createProduct);

export { adminRouter };
