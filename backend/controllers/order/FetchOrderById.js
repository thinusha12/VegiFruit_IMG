const orderModel = require('../../models/OrderModel');

const fetchOrderById = async (req, res) => {
  try {
    const id = req.query.id;
    const order = await orderModel.findOne({_id: id});
    if(order){
        res.status(200).json({ message: "Successfully Fetched Data.", data: order });
    }else{
        res.status(400).json({ message: 'Order Not Found.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong!! Fetching Data Failed." });
  }
}

module.exports = fetchOrderById;