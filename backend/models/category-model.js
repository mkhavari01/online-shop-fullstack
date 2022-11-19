import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  id: Number,
});

const CategoryModel = mongoose.model("Category", categorySchema);

export { CategoryModel };
