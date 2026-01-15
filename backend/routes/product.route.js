import express from 'express';


import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

//GET METHOD
// When you do app.use('/api/products', productRoutes), you're telling Express: "All routes in productRoutes should be prefixed with /api/products"
// So router.get('/') becomes GET /api/products/
// And router.delete('/:id') becomes DELETE /api/products/:id

router.get('/',getProducts );

router.post('/',createProduct);

router.put('/:id',updateProduct );

router.delete('/:id',deleteProduct );

export default router;