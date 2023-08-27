const orderModel = require('../../models/OrderModel');

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('user');
    res.status(200).json({ message: "Successfully Fetched Data.", data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong!! Fetching Data Failed." });
  }
}

module.exports = fetchAllOrders;