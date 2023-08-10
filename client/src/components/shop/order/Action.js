import {createOrder} from "./FetchApi";
import {toast} from "react-hot-toast";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({type: "loading", payload: true});
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({type: "cartProduct", payload: responseData.Products});
        dispatch({type: "loading", payload: false});
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    let responseData = await getBrainTreeToken();
    if (responseData && responseData) {
      setState({
        clientToken: responseData.clientToken,
        success: responseData.success,
      });
      console.log(responseData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  getPaymentProcess,
  totalCost,
  history
) => {
  if (!state.address) {
    setState({...state, error: "Please provide your address"});
  } else if (!state.phone) {
    setState({...state, error: "Please provide your phone number"});
  } else {
    try {
      const paymentData = {
        name: "User Name", // Replace with user's name
        email: "user@example.com", // Replace with user's email
        amount: totalCost() * 100, // Total amount in paise
      };

      const razorpayResponse = await getPaymentProcess(paymentData);

      const options = {
        key: "rzp_test_gmvFSAhhLN8Hh7", // Replace with your Razorpay API key
        currency: "INR",
        amount: razorpayResponse.amount,
        name: "MDM HERBAL PRODUCTS",
        description: "Thanks For Purchasing",
        order_id: razorpayResponse.productDetails.id,
        handler: (response) => {
          // Handle the payment success callback
          //alert("Payment Successful!");
          toast.success("payment is Succesfully completed");
        },
        prefill: {
          name: "dhanunjay",
          email: "dhanunjay@gmail.com",
        },
        theme: {
          color: "#067e52", // Replace with your preferred color theme
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      if (razorpayResponse) {
        // console.log(razorpayResponse);
        // const {razorpay_order_id, razorpay_payment_id} = razorpayResponse;

        const orderData = {
          allProduct: JSON.parse(localStorage.getItem("cart")),
          user: JSON.parse(localStorage.getItem("jwt")).user._id,
          amount: paymentData.amount / 100, // Convert back to rupees
          transactionId: razorpayResponse.productDetails.id,
          address: state.address,
          phone: state.phone,
        };

        const resposeData = await createOrder(orderData);

        if (resposeData.success) {
          localStorage.setItem("cart", JSON.stringify([]));
          dispatch({type: "cartProduct", payload: null});
          dispatch({type: "cartTotalCost", payload: null});
          dispatch({type: "orderSuccess", payload: true});
          setState({clientToken: "", instance: {}});
          dispatch({type: "loading", payload: false});
          // return history.push("/");
        } else if (resposeData.error) {
          console.log(resposeData.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
