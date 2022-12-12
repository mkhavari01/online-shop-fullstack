import { OrderModel } from "../../models/order-model.js";

const fetchOrders = async (req, res, next) => {
  try {
    let delivered = req.query.delivered || false;
    if (delivered === "true") delivered = true;
    else delivered = false;

    let query = OrderModel.find({ delivered: delivered });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await OrderModel.countDocuments({ delivered: delivered });
    const pages = Math.ceil(total / pageSize);
    query = query.skip(skip).limit(pageSize).sort({ createdAt: -1 });

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }
    const result = await query;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { name, address, phone, totalPrice, deliverTime, products } =
      req.body;
    const newOrder = new OrderModel({
      name,
      address,
      phone,
      totalPrice,
      deliverTime,
      products,
    });
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).json(String(error));
  }
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
