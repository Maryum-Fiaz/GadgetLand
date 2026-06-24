import express from "express";

import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'
import { getOrderDetails, getSales, myOrders, newOrder } from "../controllers/orderControllers.js";

const router = express.Router();
router.route("/orders/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser,myOrders)

router
  .route("/admin/get_sales")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSales);

export default router;
