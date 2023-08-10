import braintree from "braintree";
import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

class brainTreeClass {
  async ganerateToken(req, res) {
    try {
      const token = await gateway.clientToken.generate({});
      return res.json(token);
    } catch (err) {
      return res.json(err);
    }
  }
}

const brainTreeController = new brainTreeClass();
export default brainTreeController;
