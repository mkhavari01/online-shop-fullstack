import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: String,
  description: String,
  category: Number,
  Grouping: String,
});
const ProductsModel = mongoose.model("Products", productsSchema);

export { ProductsModel };
