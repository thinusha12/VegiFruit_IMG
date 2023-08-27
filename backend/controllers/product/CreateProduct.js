const productModel = require('../../models/ProductModel');

const createProduct = async (req, res) => {
    try {
        const product = new productModel(req.body);
        await product.save();
        res.status(201).json({ message: "Successfully Created Product.", data: product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went Wrong!! Failed to Create Product.', error: err });
    }
};

module.exports = createProduct;