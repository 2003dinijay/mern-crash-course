import jwt from 'jsonwebtoken';

// Generate Access Token (short-lived, 15 minutes)
export const generateAccessToken = (userId, email) => {
  const payload = {
    userId,
    email,
    type: 'access'
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { 
      expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
      issuer: 'auth-service',
      audience: 'mern-app'
    }
  );
};

// Generate Refresh Token (long-lived, 7 days)
export const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: 'refresh'
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
      issuer: 'auth-service',
      audience: 'mern-app'
    }
  );
};

// Generate both tokens at once
export const generateTokenPair = (userId, email) => {
  return {
    accessToken: generateAccessToken(userId, email),
    refreshToken: generateRefreshToken(userId)
  };
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET,
      {
        issuer: 'auth-service',
        audience: 'mern-app'
      }
    );
    
    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }
    
    return {
      valid: true,
      data: decoded
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET,
      {
        issuer: 'auth-service',
        audience: 'mern-app'
      }
    );
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    return {
      valid: true,
      data: decoded
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};