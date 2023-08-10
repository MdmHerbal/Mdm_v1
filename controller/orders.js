// const orderModel = require("../models/orders");

// class Order {
//   async getAllOrders(req, res) {
//     try {
//       let Orders = await orderModel
//         .find({})
//         .populate("allProduct.id", "pName pImages pPrice")
//         .populate("user", "name email")
//         .sort({ _id: -1 });
//       if (Orders) {
//         return res.json({ Orders });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async getOrderByUser(req, res) {
//     let { uId } = req.body;
//     if (!uId) {
//       return res.json({ message: "All filled must be required" });
//     } else {
//       try {
//         let Order = await orderModel
//           .find({ user: uId })
//           .populate("allProduct.id", "pName pImages pPrice")
//           .populate("user", "name email")
//           .sort({ _id: -1 });
//         if (Order) {
//           return res.json({ Order });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async postCreateOrder(req, res) {
//     let { allProduct, user, amount, transactionId, address, phone } = req.body;
//     if (
//       !allProduct ||
//       !user ||
//       !amount ||
//       !transactionId ||
//       !address ||
//       !phone
//     ) {
//       return res.json({ message: "All filled must be required" });
//     } else {
//       try {
//         let newOrder = new orderModel({
//           allProduct,
//           user,
//           amount,
//           transactionId,
//           address,
//           phone,
//         });
//         let save = await newOrder.save();
//         if (save) {
//           return res.json({ success: "Order created successfully" });
//         }
//       } catch (err) {
//         return res.json({ error: error });
//       }
//     }
//   }

//   async postUpdateOrder(req, res) {
//     let { oId, status } = req.body;
//     if (!oId || !status) {
//       return res.json({ message: "All filled must be required" });
//     } else {
//       let currentOrder = orderModel.findByIdAndUpdate(oId, {
//         status: status,
//         updatedAt: Date.now(),
//       });
//       currentOrder.exec((err, result) => {
//         if (err) console.log(err);
//         return res.json({ success: "Order updated successfully" });
//       });
//     }
//   }

//   async postDeleteOrder(req, res) {
//     let { oId } = req.body;
//     if (!oId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let deleteOrder = await orderModel.findByIdAndDelete(oId);
//         if (deleteOrder) {
//           return res.json({ success: "Order deleted successfully" });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
// }

// const ordersController = new Order();
// module.exports = ordersController;

import orderModel from "../models/orders.js";

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({_id: -1});
      if (Orders) {
        return res.json({Orders});
      }
    } catch (err) {
      console.log(err);
      return res.json({error: "An error occurred while fetching orders"});
    }
  }

  async getOrderByUser(req, res) {
    console.log(req.body);
    let {uId} = req.body; // Assuming user ID is part of URL params
    if (!uId) {
      return res.json({message: "User ID must be provided"});
    } else {
      try {
        let Order = await orderModel
          .find({user: uId})
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({_id: -1});
        if (Order) {
          return res.json({Order});
        } else {
          return res.json({message: "No orders found for the user"});
        }
      } catch (err) {
        console.log(err);
        return res.json({error: "An error occurred while fetching orders"});
      }
    }
  }

  async postCreateOrder(req, res) {
    let {allProduct, user, amount, transactionId, address, phone} = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({message: "All fields must be required"});
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newOrder.save();
        if (save) {
          return res.json({success: "Order created successfully"});
        }
      } catch (err) {
        console.log(err);
        return res.json({error: "An error occurred while creating the order"});
      }
    }
  }

  async postUpdateOrder(req, res) {
    let {oId, status} = req.body;
    if (!oId || !status) {
      return res.json({message: "Order ID and status must be provided"});
    } else {
      try {
        let updatedOrder = await orderModel.findByIdAndUpdate(oId, {
          status: status,
          updatedAt: Date.now(),
        });
        if (updatedOrder) {
          return res.json({success: "Order updated successfully"});
        } else {
          return res.json({message: "Order not found"});
        }
      } catch (err) {
        console.log(err);
        return res.json({error: "An error occurred while updating the order"});
      }
    }
  }

  async postDeleteOrder(req, res) {
    let {oId} = req.body;
    if (!oId) {
      return res.json({error: "All fields must be required"});
    } else {
      try {
        let deletedOrder = await orderModel.findByIdAndDelete(oId);
        if (deletedOrder) {
          return res.json({success: "Order deleted successfully"});
        } else {
          return res.json({message: "Order not found"});
        }
      } catch (err) {
        console.log(err);
        return res.json({error: "An error occurred while deleting the order"});
      }
    }
  }
}

const ordersController = new Order();
export default ordersController;
