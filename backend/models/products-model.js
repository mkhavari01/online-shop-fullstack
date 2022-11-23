import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: String,
  description: String,
  category: Number,
  grouping: String,
});
const ProductsModel = mongoose.model("Products", productsSchema);

export { ProductsModel };
