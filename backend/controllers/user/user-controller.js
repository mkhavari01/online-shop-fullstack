import bcryptjs from "bcryptjs";
import { UserModel } from "../../models/user-model.js";
import jwt from "jsonwebtoken";
import { ProductsModel } from "../../models/products-model.js";

const fetchUsers = (req, res, next) => {
  res.json({ message: "got request very well" });
};

const signup = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });

  newUser
    .save()
    .then(() => {
      const token = jwt.sign({ username: newUser.username }, "mkhavari0120");
      res.status(201).json({ user: newUser, token });
    })
    .catch((err) => {
      console.log("en error happened during making new user", err);
      res.status(500).json({ message: "something went wrong", err: err });
    });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const validUser = await UserModel.findOne({ username });
  if (!validUser) {
    return res.status(404).json({ message: "User is not valid." });
  }

  const validPassword = await bcryptjs.compare(password, validUser.password);
  if (!validPassword) {
    return res.status(403).json({ message: "Password is not valid." });
  }

  const token = jwt.sign({ username: username }, "mkhavari0120");
  return res.json({ token });
};

const fetchFavorites = async (req, res, next) => {
  try {
    const nums = [0, 1, 2, 3];
    const asyncRes = await Promise.all(
      nums.map(async (el) => {
        let result = await ProductsModel.find({ category: el, favorite: true });
        return result;
      })
    );
    res.json(asyncRes);
  } catch (error) {
    res.status(500).json(String(error));
    console.log("error", error);
  }
};

const fetchByCategory = async (req, res, next) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const products = await ProductsModel.find({ category: id });
    res.json(products);
  } catch (error) {
    res.status(500).json(String(error));
    console.log("error", error);
  }
};

export { fetchUsers, signup, login, fetchFavorites, fetchByCategory };
