import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;
export const getBrainTreeToken = async () => {
  let uId = JSON.parse(localStorage.getItem("jwt")).user._id;
  try {
    let res = await axios.post(`${apiURL}/api/braintree/get-token`, {
      uId: uId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getPaymentProcess = async (paymentData) => {
//   try {
//     let res = await axios.post(`${apiURL}/api/braintree/payment`, paymentData);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const loadScript = (src) => {
  return new Promise((resolve) => {
    const scriptEl = document.createElement("script");
    scriptEl.src = src;
    scriptEl.onload = () => resolve(true);
    scriptEl.onerror = () => resolve(false);
    document.body.appendChild(scriptEl);
  });
};

export const getPaymentProcess = async (paymentData) => {
  try {
    const fetch = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log(!fetch);
    if (!fetch) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    const res = await axios.post(`${apiURL}/api/razorpay/payment`, paymentData);
    const {data} = res;
    return data;

    // const options = {
    //   key: "rzp_test_gmvFSAhhLN8Hh7",
    //   currency: "INR",
    //   amount: data.amount,
    //   name: "MDM HERBAL PRODUCTS",
    //   description: "Thanks For Purchasing",
    //   order_id: data.id,
    //   handler: (response) => {
    //     // Handle the payment success callback
    //     alert("Payment Successful!");
    //     // Perform actions after successful payment, e.g., create an order
    //     createOrder(paymentData); // Call your createOrder function
    //   },
    //   prefill: {
    //     name: paymentData.name,
    //     email: paymentData.email,
    //   },
    //   theme: {
    //     color: "#067e52", // Replace with your preferred color theme
    //   },
    // };

    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (orderData) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
