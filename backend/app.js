import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { router } from "./routes/user-router.js";

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/online-shop";

app.use(cors());
app.use(express.json());

app.use(router);

connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  })
  .catch((err) => {
    console.log("we have an error in connceting to db");
    console.log(err);
  });
