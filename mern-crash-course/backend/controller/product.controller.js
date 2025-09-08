import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req,res) =>{
	try {
	  const products = await Product.find({});
	  res.status(200).json({ success: true, data: products});
	} catch (error) {
	  console.log("Error in fetching products");
	  res.status(500).json({ success: false, message: "Server Error"});
	}
  };

export const postProducts = async (req, res) => {
  const product = req.body; // User will send this data
  if (!product.name || !product.price || !product.image) {
	return res.status(400).json({ success:false, message: "Please procide all required fields"});
  }
  const newProduct = new Product(product);

  try {
	await newProduct.save();
	res.status(201).json({ success:true, data: newProduct });
  } catch (error) {
	console.error("Error in Create Product", error.message);
	res.status(500).json({ success: false, message: "Server Error"});
  }
};

export const deleteProducts = async (req,res) =>{
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
	return res.status(404).json( { success: false, message: "Id Doesn't Exist"});
  }
  
  try {
	await Product.findByIdAndDelete(id);
	res.status(200).json( { success: true, message: "Product Deleted"});
  } catch (error) {
	console.log("Error in deleting product");
	res.status(500).json({ success: false, message: "Server Error"});
  }
};

export const putProducts = async (req,res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
	return res.status(404).json( { success: false, message: "Id Doesn't Exist"});
  }
  try {
	const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
	res.status(200).json({ success: true, data: updatedProduct, message: "Product Updated Successfully"});
  } catch (error) { 
	res.status(500).json( {success: false, message: "Server Error"});
  }
};