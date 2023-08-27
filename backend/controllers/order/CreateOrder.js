const orderModel = require('../../models/OrderModel');

const createOrder = async (req, res) => {
    try {
        console.log(req.body)

        const order = new orderModel(req.body);
        let fullPrice = 0;

        req.body.products.forEach(element => {
            fullPrice += element.price;
        });

        order.price = fullPrice;
        await order.save();
        res.status(201).json({ message: "Successfully Created Order.", data: order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went Wrong!! Failed to Create Order.', error: err });
    }
};

module.exports = createOrder;