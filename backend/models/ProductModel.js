const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true }
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;