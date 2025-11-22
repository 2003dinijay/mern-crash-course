import express from 'express';


import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

//GET METHOD



// What happens:
// When you do app.use('/api/products', productRoutes), you're telling Express: "All routes in productRoutes should be prefixed with /api/products"
// So router.get('/') becomes GET /api/products/
// And router.delete('/:id') becomes DELETE /api/products/:id

// Benefits:
// Cleaner code - You don't repeat /api/products in every route


router.get('/',getProducts );

router.post('/',createProduct);

router.put('/:id',updateProduct );

router.delete('/:id',deleteProduct );

export default router;