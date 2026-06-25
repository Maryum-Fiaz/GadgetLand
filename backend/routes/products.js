import express from 'express';
import { createProductReview, deleteProduct, getAdminProducts, getProductDetails, getProductReviews, getProducts, newProduct, updateProduct } from '../controllers/productControllers.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// endpoints
router.route('/products').get(getProducts);
router
    .route("/admin/products")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/products/:id").get(getProductDetails);

router
    .route("/admin/products/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
    .route("/admin/products/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createProductReview);

export default router;