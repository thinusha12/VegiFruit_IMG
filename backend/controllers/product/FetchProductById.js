const productModel = require('../../models/ProductModel');

const fetchProductById = async (req, res) => {
  try {

    const id = req.params.id;
    const product = await productModel.findOne({ _id: id });

    if (product) {
      res.status(200).json({ message: "Successfully Fetched Data.", data: product });
    } else {
      res.status(400).json({ message: 'Product Not Found.' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong!! Fetching Data Failed." });
  }
}

module.exports = fetchProductById;
