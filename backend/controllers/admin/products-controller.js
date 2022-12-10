import { ProductsModel } from "../../models/products-model.js";
import { validationResult } from "express-validator";

const fetchProducts = async (req, res, next) => {
  try {
    let query = ProductsModel.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await ProductsModel.countDocuments();
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

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, category, description, favorite } = req.body;

    const newProduct = new ProductsModel({
      name,
      productImage: req.file?.path || "",
      category,
      description,
      favorite,
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: String(error) });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductsModel.deleteOne({ _id: id });
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

const updateProducts = async (req, res, next) => {
  const data = req.body;
  try {
    const asyncRes = await Promise.all(
      data.map(async (el, index) => {
        let result = await ProductsModel.findByIdAndUpdate(
          { _id: el.id },
          { $set: el },
          {
            new: true,
            useFindAndModify: false,
          }
        );
        return result;
      })
    );
    res.json(asyncRes);
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: String(error) });
  }
};

const fetchOneProduct = async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};

const updateOneProduct = async (req, res, next) => {
  try {
    const { name, category, description, favorite } = req.body;
    let newValue = { name, category, description, favorite };
    if (req.file) {
      newValue["productImage"] = req.file.path;
    }
    const result = await ProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: newValue,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: String(error) });
  }
};

export {
  fetchProducts,
  updateProducts,
  deleteProduct,
  createProduct,
  fetchOneProduct,
  updateOneProduct,
};
