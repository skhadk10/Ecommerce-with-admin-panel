const { ImageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64; // Add missing comma for correct data URI format
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurred during image upload",
    });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();

    res.json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred during add product upload",
    });
  }
};
// fetch all product
const fetchProduct = async (req, res) => {
  try {
    const listOfProduct = await Product.find({});
    res.json({
      success: true,
      data: listOfProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred during add product upload",
    });
  }
};
//edit a product
const editProduct = async (req, res) => {
  console.log(req.body,req.params,"inding params");
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.json({
        success: false,
        message: "Product cannot be found",
      });
    Product.title = title || findProduct.title;
    Product.description = description || findProduct.description;
    Product.category = category || findProduct.category;
    Product.brand = brand || findProduct.brand;
    Product.price = price || findProduct.price;
    Product.salePrice = salePrice || findProduct.salePrice;
    Product.totalStock = totalStock || findProduct.totalStock;
    Product.image = image || findProduct.image;

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred during add product upload",
    });
  }
};
//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.param;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.json({
        success: false,
        message: "Product cannot be found",
      });
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred during add product upload",
    });
  }
};
module.exports = {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
};
