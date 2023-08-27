const mongoose = require('mongoose');
const ObjectId = require('bson').ObjectId;

const orderSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: ObjectId,
            ref: 'Product',
        },
        quantity: { type: Number },
        price: { type: Number }
    }],
    payment: {
        date: { type: Date },
        method: { type: String }
    },
    price: { type: Number, required: true, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;