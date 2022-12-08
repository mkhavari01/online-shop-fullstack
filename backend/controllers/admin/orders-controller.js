import { OrderModel } from "../../models/order-model.js";

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

export { fetchOrders, createOrder, fetchOneOrder, updateOneOrderDelivery };
