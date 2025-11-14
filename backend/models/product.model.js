import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},{
    timestamps: true //make sure you have createdAt, updatedAt fields on each document
  
});
  

//creating product model
const Product = mongoose.model('Product', productSchema);

//mongoose needs to add the capital letter for model names and make it plural for you
//since we are using it in different files we need to export it
//once we make a Product in the mongoDB it will be stored in products collection

export default Product;