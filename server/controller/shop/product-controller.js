const Product = require("../../models/Product");

const getFilterProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(500).json({
        success: false,
        message: "didnot find product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Fetched",
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = { getFilterProducts };
