import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const instance = new razorpay({
  key_id: "rzp_test_EQ6ICWtMQ2KHuN",
  key_secret: "R0EJeJAFEhdW7QmjRLkcHrbG",
});

export const checkout = async (req, res) => {
  try {
    const { total } = req.body;
    const option = {
      amount: total * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(option);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};
