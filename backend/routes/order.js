import express from "express";

import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'
import { getSales, newOrder } from "../controllers/orderControllers.js";

const router = express.Router();
router.route("/orders/new").post(isAuthenticatedUser, newOrder);

router
  .route("/admin/get_sales")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSales);

export default router;
