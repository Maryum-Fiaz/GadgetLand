import express from "express";

import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'
import { deleteOrder, getAdminOrders, getOrderDetails, getSales, myOrders, newOrder, updateOrder } from "../controllers/orderControllers.js";

const router = express.Router();
router.route("/orders/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser,myOrders)

// admin
router
  .route("/admin/get_sales")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSales);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminOrders)

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default router;
