import { OrderModel } from "../models/order-model.js";

const fetchOrders = async (req, res, next) => {
  let page = req.query.page ? Math.max(0, req.query.page) : 1;
  let limit = req.query.limit || 1;

  const orderModelLength = await OrderModel.countDocuments({});

  const orders = await OrderModel.find()
    .limit(limit)
    .skip(limit * page);

  res.json({ data: orders, metadata: { total: orderModelLength } });
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
