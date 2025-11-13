import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();


app.get('/products', (req, res) => {
  res.send('List of products');
});

const PORT = 5000;

// CONNECT TO DB
app.listen(PORT, () => {
  connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
