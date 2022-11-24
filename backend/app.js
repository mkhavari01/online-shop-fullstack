import express, { urlencoded } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { userRouter } from "./routes/user-router.js";
import { adminRouter } from "./routes/admin-router.js";

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/online-shop";

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(userRouter);
app.use(adminRouter);

connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  })
  .catch((err) => {
    console.log("we have an error in connceting to db", err);
  });
