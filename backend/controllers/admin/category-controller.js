import { CategoryModel } from "../../models/category-model.js";

const fetchCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.json(String(error));
  }
};

export { fetchCategories };
