import { OrderModel } from "../models/order-model.js";

const fetchOrders = async (req, res, next) => {
  let page = Math.max(0, req.query.page);
  let limit = req.query.limit;

  const orders = await OrderModel.find()
    .limit(limit)
    .skip(limit * page);

  res.json(orders);
};

const createOrder = async (req, res, next) => {
  const { name, time, totalPrice, deliverd } = req.body;
  const newOrder = new OrderModel({
    name,
    time,
    totalPrice,
    deliverd,
  });
  await newOrder.save();
  res.json({ message: "we r requesting orders list", data: newOrder });
};

export { fetchOrders, createOrder };
