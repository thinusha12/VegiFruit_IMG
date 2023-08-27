const bcrypt = require('bcrypt');
const userModel = require('../../models/UserModel');

const register = async (req, res) => {
  try {

    const { email } = req.body;

    //check for email availablility
    const isUser = await userModel.findOne({ email: email.toLowerCase() });

    if (isUser) {
      res.status(400).json({ message: "Email is Already in Use." });
    } else {
      console.log(isUser)
      const user = new userModel(req.body);
      console.log(user)
      user.email = email.toLowerCase();
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      res.status(201).json({ message: "Account Created Successfully.", data: user });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong! Failed to Register User.", error: err });
  }

};

module.exports = register;