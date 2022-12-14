import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";
import orderRoutes from "./routes/order";
// Config
dotenv.config();
const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
//routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
// connection DB
mongoose
  .connect("mongodb://localhost:27017/asm_nodejs")
  .then(() => console.log("Successfully connected database to MongoDB"))
  .catch((error) => console.error(error));
// connect
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);
