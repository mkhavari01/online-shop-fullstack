import { OrderModel } from "../models/order-model.js";

const fetchOrders = async (req, res, next) => {
  let page = req.query.page ? Math.max(0, req.query.page) : 1;
  let limit = req.query.limit || 1;
  let deliverd = req.query.deliverd || false;
  let filter;
  deliverd == "true" ? (filter = true) : (filter = false);
  const orderModelLength = await OrderModel.countDocuments({
    deliverd: filter,
  });

  console.log("deliverd is ", deliverd, "type is ", typeof filter, filter);

  const orders = await OrderModel.find({ deliverd: filter })
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
