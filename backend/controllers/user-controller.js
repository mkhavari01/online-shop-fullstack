import bcryptjs from "bcryptjs";
import { UserModel } from "../models/user-model.js";
import jwt from "jsonwebtoken";

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

export { fetchUsers, signup, login };
