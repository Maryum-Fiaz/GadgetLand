import express from 'express';
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from '../controllers/productControllers.js';

const router = express.Router();

// Maps the endpoint to the logic
router.route('/products').get(getProducts);
router.route('/admin/products').post(newProduct);
router.route('/products/:id').get(getProductDetails);
router.route('/admin/products/:id').put(updateProduct);
router.route('/admin/products/:id').delete(deleteProduct);

export default router;