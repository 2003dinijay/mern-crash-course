import Product from '../models/product.model.js';
//methods for product service

//get all products
export const getAllProducts = async () => {
  try {
    const products = await Product.find({});
    return { success: true, data: products };
  } catch (error) {
    throw new Error('Failed to fetch products from database');
  }
};


export const createNewProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    return { success: true, data: newProduct };
  } catch (error) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      throw new Error('Product with this information already exists');
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      throw new Error(`Validation error: ${error.message}`);
    }
    
    throw new Error('Failed to create product');
  }
};

//update product by id
export const updateProductById = async (productId, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return { success: false, error: 'Product not found' };
    }

    return { success: true, data: updatedProduct };
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      throw new Error(`Validation error: ${error.message}`);
    }
    
    throw new Error('Failed to update product');
  }
};
//delete product by id
export const deleteProductById = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return { success: false, error: 'Product not found' };
    }

    return { success: true, data: deletedProduct };
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

//get product by id
export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    return { success: true, data: product };
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};
