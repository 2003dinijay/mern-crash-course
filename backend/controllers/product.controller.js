import * as productService from '../services/product.service.js';
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId,
  sanitizeProductResponse,
} from '../dto/product.dto.js';

//get products controller
export const getProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    
    // Sanitize response data
    const sanitizedProducts = result.data.map(sanitizeProductResponse);
    
    res.status(200).json({ success: true, data: sanitizedProducts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch products.',
    });
  }
};

//create product controller
export const createProduct = async (req, res) => {
  // Validate and sanitize input data
  const validation = validateCreateProduct(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.errors,
    });
  }

  try {
    const result = await productService.createNewProduct(validation.data);
    
    // Sanitize response data
    const sanitizedProduct = sanitizeProductResponse(result.data);
    
    res.status(201).json({ success: true, data: sanitizedProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error: Unable to save product.',
    });
  }
};

//update product controller
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  // Validate product ID
  const idValidation = validateProductId(id);
  if (!idValidation.valid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error,
    });
  }

  // Validate and sanitize update data
  const dataValidation = validateUpdateProduct(req.body);
  if (!dataValidation.valid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: dataValidation.errors,
    });
  }

  try {
    const result = await productService.updateProductById(
      idValidation.id,
      dataValidation.data
    );

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.error,
      });
    }

    // Sanitize response data
    const sanitizedProduct = sanitizeProductResponse(result.data);
    
    res.status(200).json({ success: true, data: sanitizedProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error: Unable to update product.',
    });
  }
};

//delete product controller
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Validate product ID
  const idValidation = validateProductId(id);
  if (!idValidation.valid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error,
    });
  }

  try {
    const result = await productService.deleteProductById(idValidation.id);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error: Unable to delete product.',
    });
  }
};
