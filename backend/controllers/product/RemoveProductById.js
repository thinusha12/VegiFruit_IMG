const productModel = require('../../models/ProductModel');

const removeProductById = async (req, res) => {
    try {
        const id = req.params.id;

        //check for availability
        const isProduct = await productModel.findOne({ _id: id });
        
        if (!isProduct) {
            res.status(400).json({ message: 'Product Not Found.' });
        } else {
            const product = await productModel.findByIdAndDelete(id);
            res.status(200).json({ data: product, message: 'Successfully Deleted.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: 'Something Went Wrong!! Deleting Product Failed' });
    }
};

module.exports = removeProductById;