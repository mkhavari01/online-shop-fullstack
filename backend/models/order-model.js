import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  totalPrice: Number,
  time: Date,
  deliverd: Boolean,
});

const OrderModel = mongoose.model("Orders", orderSchema);

export { OrderModel };
