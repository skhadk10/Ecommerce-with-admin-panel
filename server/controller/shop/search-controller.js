import Product from "../../models/Product.js";

export const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    console.log(keyword, "keyword");
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        succes: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i");
    console.log(regEx, "regEx");
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    console.log(createSearchQuery, "createSearchQuery");
    console.log(searchResults, "searchResults");
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
