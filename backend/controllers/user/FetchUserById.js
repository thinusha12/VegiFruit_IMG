const userModel = require('../../models/UserModel');

const fetchUserById = async (req, res) => {
  try {

    const id = req.query.id;
    const user = await userModel.findOne({ _id: id });
    if (user) {
      res.status(200).json({ message: "Successfully Fetched Data.", data: user });
    } else {
      res.status(400).json({ message: 'User Not Found.' });
    }

  } catch (err) {
    res.status(500).json({ message: "Something went Wrong!! Fetching Data Failed." });
  }
}

module.exports = fetchUserById;
