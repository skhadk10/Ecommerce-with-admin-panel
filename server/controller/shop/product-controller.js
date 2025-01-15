const Product = require("../../models/Product");

const getFilterProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    console.log(req.query, "check query");
    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;
      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);
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

const getProductDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const products = await Product.findById(id);

    if (!products) {
      res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    res.json({
      success: true,
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

module.exports = { getFilterProducts ,getProductDetails};
