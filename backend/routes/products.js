import express from 'express';
import { getProductDetails, getProducts, newProduct } from '../controllers/productControllers.js';

const router = express.Router();

// Maps the endpoint to the logic
router.route('/products').get(getProducts);
router.route('/admin/products').post(newProduct);
router.route('/products/:id').get(getProductDetails);

export default router;