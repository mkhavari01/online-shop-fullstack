import { OrderModel } from "../models/order-model.js";
import { CategoryModel } from "../models/category-model.js";
import { ProductsModel } from "../models/products-model.js";
//// ORDERS REQUESTS
const fetchOrders = async (req, res, next) => {
  let page = req.query.page ? Math.max(0, req.query.page) : 1;
  let limit = req.query.limit || 1;
  let delivered = req.query.delivered || false;
  let filter;
  delivered == "true" ? (filter = true) : (filter = false);
  const orderModelLength = await OrderModel.countDocuments({
    delivered: filter,
  });

  const orders = await OrderModel.find({ delivered: filter })
    .limit(limit)
    .skip(limit * page);

  res.json({ data: orders, metadata: { total: orderModelLength } });
};

const createOrder = async (req, res, next) => {
  const { name, time, totalPrice, delivered } = req.body;
  const newOrder = new OrderModel({
    name,
    time,
    totalPrice,
    delivered,
  });
  await newOrder.save();
  res.json({ message: "we r requesting orders list", data: newOrder });
};

const fetchOneOrder = async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  res.json(order);
};

const updateOneOrderDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { field, data } = req.body;
  const updateValue = {};
  updateValue[field] = data;
  // updateValue["deliverdTime"] = new Date();
  try {
    const result = await OrderModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateValue,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "sth went wrong", error });
  }
};

//// CATEGORIES REQUESTS

const fetchCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.json(String(error));
  }
};

//// PRODUCTS REQUESTS
const fetchProducts = async (req, res, next) => {
  try {
    const products = await ProductsModel.find();
    res.json(products);
  } catch (error) {
    res.json(String(err));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, productImage, category, description } = req.body;
    const newProduct = new ProductsModel({
      name,
      productImage: req.file.path,
      category,
      description,
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: String(error) });
  }
};

const updateProducts = async (req, res, next) => {
  console.log(req.body, "is req body");
  const data = req.body;

  try {
    const asyncRes = await Promise.all(
      data.map(async (el, index) => {
        let result = await ProductsModel.findByIdAndUpdate(
          { _id: el.id },
          { $set: el },
          {
            new: true,
            useFindAndModify: false,
          }
        );
        return result;
      })
    );
    res.json(asyncRes);
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: String(error) });
  }
};

export {
  fetchOrders,
  createOrder,
  fetchOneOrder,
  updateOneOrderDelivery,
  fetchCategories,
  fetchProducts,
  updateProducts,
  createProduct,
};
