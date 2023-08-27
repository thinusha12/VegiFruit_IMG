const userModel = require('../../models/UserModel');

const fetchAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "Successfully Fetched Data.", data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong!! Fetching Data Failed." });
  }
}

module.exports = fetchAllUsers;
