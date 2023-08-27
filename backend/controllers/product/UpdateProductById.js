const productModel = require('../../models/ProductModel');

const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body)

        //check for availability
        const isProduct = await productModel.findOne({ _id: id });

        if (!isProduct) {
            res.status(400).json({ message: 'Product not found' });
        } else {
            const product = await productModel.findByIdAndUpdate(id, req.body);
            res.status(201).json({ message: "Successfully Updated Category", data: product });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went Wrong!! Failed to Update Product', error: err });
    }
}

module.exports = updateProductById;