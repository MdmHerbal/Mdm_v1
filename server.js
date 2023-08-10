// /*

// ================== Most Important ==================
// * Issue 1 :
// In uploads folder you need create 3 folder like bellow.
// Folder structure will be like:
// public -> uploads -> 1. products 2. customize 3. categories
// *** Now This folder will automatically create when we run the server file

// * Issue 2:
// For admin signup just go to the auth
// controller then newUser obj, you will
// find a role field. role:1 for admin signup &
// role: 0 or by default it for customer signup.
// go user model and see the role field.

// */

// import express from "express";
// const app = express();
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// //config
// dotenv.config();

// import connectDB from "./config/db.js";
// import authRouter from "./routes/auth.js";
// import categoryRouter from "./routes/categories.js";
// import productRouter from "./routes/products.js";
// import brainTreeRouter from "./routes/braintree.js";
// import orderRouter from "./routes/orders.js";
// import usersRouter from "./routes/users.js";
// import customizeRouter from "./routes/customize.js";

// // Import Auth middleware for check user login or not~
// import {loginCheck} from "./middleware/auth.js";
// import CreateAllFolder from "./config/uploadFolderCreateScript.js";

// /* Create All Uploads Folder if not exists | For Uploading Images */
// CreateAllFolder();

// // Database Connection
// // mongoose
// //   .connect(process.env.DATABASE, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useCreateIndex: true,
// //   })
// //   .then(() =>
// //     console.log(
// //       "==============Mongodb Database Connected Successfully=============="
// //     )
// //   )
// //   .catch((err) => console.log("Database Not Connected !!!"));
// connectDB();
// // Middleware
// app.use(morgan("dev"));
// app.use(cookieParser());
// app.use(cors());
// // app.use(express.static("public"));
// // app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// // Routes
// app.use("/api", authRouter);
// app.use("/api/user", usersRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/product", productRouter);
// app.use("/api", brainTreeRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/customize", customizeRouter);

// // Run Server
// const PORT = process.env.PORT || 8080;
// app.listen(8080, () => {
//   console.log("Server is running on ", PORT);
// });

import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose"; // Change Mongoose import to 'mongoose'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

//config
dotenv.config();

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/categories.js";
import productRouter from "./routes/products.js";
import brainTreeRouter from "./routes/braintree.js";
import orderRouter from "./routes/orders.js";
import usersRouter from "./routes/users.js";
import customizeRouter from "./routes/customize.js";

// Import Auth middleware for check user login or not~
import {loginCheck} from "./middleware/auth.js";
import CreateAllFolder from "./config/uploadFolderCreateScript.js";

/* Create All Uploads Folder if not exists | For Uploading Images */
CreateAllFolder();

// Database Connection
connectDB(); // Call the connectDB function to establish the MongoDB connection

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

// Run Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
