import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    stock: { type: String, required: true, default: "0" },
    description: { type: String, required: false, default: "" },
    category: { type: Number, required: true },
    productImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const ProductsModel = mongoose.model("Products", productsSchema);

export { ProductsModel };
