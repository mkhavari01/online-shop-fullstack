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

const fetchOneOrder = async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  res.json(order);
};

const updateOneOrderDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { field, data } = req.body;
  const updateValue = {};
  updateValue[field] = data;
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
    // console.log("err is", error);
  }
};

export { fetchOrders, createOrder, fetchOneOrder, updateOneOrderDelivery };
