import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    shippingInfo: {
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true,
      },
      city: {
        type: String,
        require: true,
      },
      state: {
        type: String,
        require: true,
      },
      other: {
        type: String,
        require: true,
      },
      pincode: {
        type: Number,
        require: true,
      },
      country: {
        type: String,
        require: true,
      },
    },
    paymentInfo: {
      razorpayOrderId: {
        type: String,
        require: true,
      },
      razorpayPaymentId: {
        type: String,
        require: true,
      },
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    totalPriceAfterDiscount: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
