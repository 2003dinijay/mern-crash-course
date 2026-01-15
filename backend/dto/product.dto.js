import mongoose from 'mongoose';
//
export const validateCreateProduct = (data) => {
  const errors = [];

  // Validate name
  if (!data.name) {
    errors.push('Product name is required');
  } else if (typeof data.name !== 'string') {
    errors.push('Product name must be a string');
  } else if (data.name.trim().length === 0) {
    errors.push('Product name cannot be empty');
  } else if (data.name.length > 100) {
    errors.push('Product name must be less than 100 characters');
  }

  // Validate price
  if (data.price === undefined || data.price === null) {
    errors.push('Product price is required');
  } else if (typeof data.price !== 'number' && isNaN(Number(data.price))) {
    errors.push('Product price must be a valid number');
  } else if (Number(data.price) < 0) {
    errors.push('Product price cannot be negative');
  }

  // Validate image
  if (!data.image) {
    errors.push('Product image is required');
  } else if (typeof data.image !== 'string') {
    errors.push('Product image must be a string');
  } else if (!isValidImageUrl(data.image)) {
    errors.push('Product image must be a valid URL');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Return sanitized data
  return {
    valid: true,
    data: {
      name: data.name.trim(),
      price: Number(data.price),
      image: data.image.trim(),
    },
  };
};
//validate update product
export const validateUpdateProduct = (data) => {
  const errors = [];
  const sanitizedData = {};

  // Validate name if provided
  if (data.name !== undefined) {
    if (typeof data.name !== 'string') {
      errors.push('Product name must be a string');
    } else if (data.name.trim().length === 0) {
      errors.push('Product name cannot be empty');
    } else if (data.name.length > 100) {
      errors.push('Product name must be less than 100 characters');
    } else {
      sanitizedData.name = data.name.trim();
    }
  }

  // Validate price if provided
  if (data.price !== undefined) {
    if (typeof data.price !== 'number' && isNaN(Number(data.price))) {
      errors.push('Product price must be a valid number');
    } else if (Number(data.price) < 0) {
      errors.push('Product price cannot be negative');
    } else {
      sanitizedData.price = Number(data.price);
    }
  }

  // Validate image if provided
  if (data.image !== undefined) {
    if (typeof data.image !== 'string') {
      errors.push('Product image must be a string');
    } else if (!isValidImageUrl(data.image)) {
      errors.push('Product image must be a valid URL');
    } else {
      sanitizedData.image = data.image.trim();
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: sanitizedData };
};

// Validate product ID
export const validateProductId = (id) => {
  if (!id) {
    return { valid: false, error: 'Product ID is required' };
  }

  const sanitizedId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(sanitizedId)) {
    return { valid: false, error: 'Invalid product ID format' };
  }

  return { valid: true, id: sanitizedId };
};

// Helper function to validate image URL
const isValidImageUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};
// Sanitize product response
export const sanitizeProductResponse = (product) => {
  if (!product) return null;

  // Convert to plain object if it's a Mongoose document
  const productObj = product.toObject ? product.toObject() : product;

 
  return {
    _id: productObj._id,
    name: productObj.name,
    price: productObj.price,
    image: productObj.image,
    createdAt: productObj.createdAt,
    updatedAt: productObj.updatedAt,
  };
};
