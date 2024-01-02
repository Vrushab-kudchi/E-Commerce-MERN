import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";

import dbConnect from "./config/dbConnect.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
