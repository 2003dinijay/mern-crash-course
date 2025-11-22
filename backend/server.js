import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

//to communiccate with mongodb
import mongoose from 'mongoose';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //middleware to parse json request body or allow us to accept JSON data from the req.body

app.use("/api/products",productRoutes)


// CONNECT TO DB


app.listen(PORT, () => {
  connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
