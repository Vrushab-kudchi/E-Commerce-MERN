import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  // {
  //   products: [
  //     {
  //       product: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Product",
  //       },
  //       count: Number,
  //       color: String,
  //       price: Number,
  //     },
  //   ],
  //   cartTotal: Number,
  //   totalAfterDiscount: Number,
  //   orderBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "user",
  //   },
  // },
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
