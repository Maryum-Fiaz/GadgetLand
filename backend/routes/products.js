import express from 'express';
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from '../controllers/productControllers.js';
import { isAuthenticateUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// endpoints
router.route('/products').get(isAuthenticateUser, authorizeRoles('admin'), getProducts);
router.route('/admin/products').post(newProduct);
router.route('/products/:id').get(getProductDetails);
router.route('/admin/products/:id').put(updateProduct);
router.route('/admin/products/:id').delete(deleteProduct);

export default router;