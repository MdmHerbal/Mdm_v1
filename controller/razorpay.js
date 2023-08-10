import Razorpay from "razorpay";
import shortid from "shortid";
// import orderModel from "../models/orderModel"; // Import your order model

class RazorpayController {
  async paymentProcess(req, res) {
    try {
      const {amount, name, mail} = req.body;
      console.log(req.body);
      const payment_capture = 1;
      var instance = new Razorpay({
        key_id: "rzp_test_gmvFSAhhLN8Hh7",
        key_secret: "CG2sMocHkWqoCgkIXrw1Ojeb",
      });

      const productDetails = await instance.orders.create({
        amount: amount,
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture,
      });

      res.status(201).json({success: true, amount, productDetails});

      //  const order = new orderModel({
      //   allProduct: [], // Add your product details here
      //   user: req.user._id, // Assuming user ID is available in req.user
      //   amount: amount,
      //   transactionId: productDetails.id, // Use Razorpay order ID as transaction ID
      //   address: "Some Address", // Replace with actual address
      //   phone: 1234567890, // Replace with actual phone number
      //   status: "Not processed",
      // });

      // await order.save();

      // Sending the response with success and order details
      // res.status(201).json({
      //   success: true,
      //   productDetails,
      //   amount,
      //   id: order.id, // Include the saved order's ID
      // });
      // Create the order instance and save it if needed
      // const order = new orderModel({
      //   products: cart,
      //   payment: productDetails,
      //   buyer: req.user._id,
      // });
      // await order.save();

      // res.status(201).json({
      //   success: true,
      //   productDetails,
      //   amount,
      //   // id: order.id,
      //   // order: order, // If you save the order instance, you can include it here
      // });
    } catch (error) {
      res.status(500).send({message: false, error});
    }
  }
}

export default new RazorpayController();
