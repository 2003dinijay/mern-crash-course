import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';


dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse json request body or allow us to accept JSON data from the req.body

//GET METHOD
app.get('/api/products', async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json({success: true, data: products });  
  } catch (error) {

    //adding console log for debugging purpose

    console.error('Error in fetching products:', error.message);
    res.status(500).json({success: false, message: 'Server Error: Unable to fetch products.' });
  }
});

app.post('/products', async (req, res) => {
  const product= req.body; //user will send product data in the request body

  //required fields validation
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success:false, message: 'Please provide name, price, and image for the product.' });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct });
  } catch (error) {
   console.error('Error creating product:', error.message);
   res.status(500).json({success: false, message: 'Server Error: Unable to save product.' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const {id} = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: 'Invalid product ID format.' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json({success: true, data: updatedProduct });
  } catch (error) {
      res.status(500).json({success: false, message: 'Server Error: Unable to update product.' });  
    }
});

app.delete('/api/products/:id', async (req, res) => {
  const {id} = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: 'Product deleted successfully' });
  } catch (error) {

    //adding console log for debugging purpose
    console.error('Error deleting product:', error.message);
    res.status(404).json({success: false, message: 'Product not found. Please add a vaslid product id.' });
    }
});



// CONNECT TO DB

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
