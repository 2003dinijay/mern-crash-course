import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();


app.post('/products', async (req, res) => {
  const product= req.body; //user will send product data in the request body

  //required fields validation
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Please provide name, price, and image for the product.' });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct });
  } catch (error) {
   console.error('Error saving product:', error);
   res.status(500).json({ message: 'Server Error: Unable to save product.' });
  }
});

// CONNECT TO DB

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
