import express from "express";
import {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  // emptyCart,
  // applyCoupon,
  createOrder,
  // getOrders,
  // updateOrderStatus,
  // getAllOrders,
  // getOrderById,
  deleteSingleCart,
  updateProductFromCart,
  getUserOrders,
} from "../controller/userCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { checkout, paymentVerification } from "../controller/paymentCtrl.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/cart", authMiddleware, userCart);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);

router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
// router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/getmyorders", authMiddleware, getUserOrders);
router.get("/cart", authMiddleware, getUserCart);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/:id", authMiddleware, getAUser);
// router.get("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderById);

// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  deleteSingleCart
);
router.delete("/:id", deleteAUser);

router.put("/reset-password/:token", resetPassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/password", authMiddleware, updatePassword);
router.put("/edit-user", authMiddleware, updateAUser);
router.put("/block-user/:id", authMiddleware, blockUser);
router.put("/unblock-user/:id", authMiddleware, unblockUser);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
router.put(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductFromCart
);

export default router;
