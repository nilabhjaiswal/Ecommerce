import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controller/orderController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();
// CREATE ORDER
router.route("/order/new").post(isAuthenticatedUser, newOrder);
// GET SINGLE ORDER
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
// GET LOGGED IN USER ORDER(user ki id me jana or name or email lena)
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
// GET ALL ORDERS --- (Admin)
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
// UPDATE ORDER STATUS & DELETE ORDER -- (Admin)
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


export default router;
