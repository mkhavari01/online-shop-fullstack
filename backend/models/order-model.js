import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    totalPrice: { type: String, required: true },
    delivered: { type: Boolean, required: false, default: false },
    products: { type: Array, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    deliverTime: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Orders", orderSchema);

export { OrderModel };
