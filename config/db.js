// const mongoose = require("mongoose");
// try {
//   mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   });
//   console.log("Database Connected Successfully");
// } catch (err) {
//   console.log("Database Not Connected");
// }

// // mongoose.connect("mongodb://localhost:27017/Ecommerce",

// import mongoose from "mongoose";
// const MANGO_URL =
//   "mongodb+srv://mdmherbalproducts:sTIA6iImn1bYD7ZJ@cluster0.lwoezk9.mongodb.net/demo";
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(MANGO_URL);
//     console.log(
//       `Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white
//     );
//   } catch (error) {
//     console.log(`Error in MongoDB ${error}`);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import chalk from "chalk";

const MANGO_URL =
  "mongodb+srv://mdmherbalproducts:sTIA6iImn1bYD7ZJ@cluster0.lwoezk9.mongodb.net/demo";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MANGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      chalk.bgMagenta.white(
        `Connected To MongoDB Database ${conn.connection.host}`
      )
    );
  } catch (error) {
    console.error(chalk.red(`Error in MongoDB ${error}`));
  }
};

export default connectDB;
