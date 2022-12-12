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
  deleteProduct,
  fetchOneProduct,
  updateOneProduct,
} from "../controllers/index.js";
import { postProductValidate } from "../validation/product.validator.js";
import { auth } from "../middleware/auth.js";

const adminRouter = express.Router();
// adminRouter.use(auth);
// ORDERS ROUTES
adminRouter.get("/orders", fetchOrders);
adminRouter.get("/orders/:id", fetchOneOrder);
adminRouter.patch("/orders/:id", auth, updateOneOrderDelivery);
// adminRouter.post("/orders/create", auth, createOrder);

// CATEGORY ROUTES
adminRouter.get("/categories", fetchCategories);

// PRODUCTS ROUTES
adminRouter.get("/products", fetchProducts);
adminRouter.get("/products/:id", fetchOneProduct);

adminRouter.delete("/products/:id", auth, deleteProduct);
adminRouter.patch(
  "/products/:id",
  auth,
  upload.single("productImage"),
  updateOneProduct
);
adminRouter.patch("/entity", auth, updateProducts);
adminRouter.post(
  "/products",
  auth,
  upload.single("productImage"),
  postProductValidate(),
  createProduct
);

export { adminRouter };
