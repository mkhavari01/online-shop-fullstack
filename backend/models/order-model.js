import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  username: String,
  totalPrice: String,
  time: Date,
  delivered: Boolean,
  products: Array,
  phone: String,
  address: String,
  deliveryTime: String,
});

const OrderModel = mongoose.model("Orders", orderSchema);

export { OrderModel };
