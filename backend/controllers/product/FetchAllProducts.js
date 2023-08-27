const productModel = require('../../models/ProductModel');

const fetchAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ message: "Successfully Fetched Data.", data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong!! Fetching Data Failed." });
  }
}

module.exports = fetchAllProducts;