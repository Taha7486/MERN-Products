import mongoose from "mongoose";
import Product from "../Models/product.js";


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success : false,message: "Please provide all required fields: name, price, image." });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({success : true,message: "Product created successfully", data: newProduct});
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ success : false,message: "server error" });
  }
}

const updateProduct = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product ID" });
  }

  const product = req.body;
  try {
    const updatedProduct =  await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, message: "Product updated successfully",data: updatedProduct });
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const deleteProduct = async (req, res) => {
  const {id} =req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};