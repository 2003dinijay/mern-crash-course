
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json({success: true, data: products });  
  } catch (error) {

    //adding console log for debugging purpose

    console.error('Error in fetching products:', error.message);
    res.status(500).json({success: false, message: 'Server Error: Unable to fetch products.' });
  }
};
export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  
  // Sanitize ID by trimming whitespace and newlines
  const sanitizedId = id.trim();

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(sanitizedId)) {
    return res.status(404).json({success: false, message: 'Invalid product ID.' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(sanitizedId, product, {new: true});
    
    // Check if product exists
    if (!updatedProduct) {
      return res.status(404).json({success: false, message: 'Product not found.' });
    }
    
    res.status(200).json({success: true, data: updatedProduct });
  } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).json({success: false, message: 'Server Error: Unable to update product.' });  
  }
};

export const deleteProduct =  async (req, res) => {
  const {id} = req.params;
  
  // Sanitize ID by trimming whitespace and newlines
  const sanitizedId = id.trim();
  
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(sanitizedId)) {
    return res.status(400).json({success: false, message: 'Invalid product ID format.' });
  }
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(sanitizedId);
    
    // Check if product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({success: false, message: 'Product not found. Please add a valid product id.' });
    }
    
    res.status(200).json({success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({success: false, message: 'Server Error: Unable to delete product.' });
  }
};