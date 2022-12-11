import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { connect } from "mongoose";
import { userRouter } from "./routes/user-router.js";
import { adminRouter } from "./routes/admin-router.js";

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/online-shop";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.set("views", path.join(__dirname, "views"), "views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(adminRouter);
app.use(userRouter);

connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  })
  .catch((err) => {
    console.log("we have an error in connceting to db", err);
  });
