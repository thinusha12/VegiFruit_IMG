const bcrypt = require('bcrypt');
const userModel = require('../../models/UserModel');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check for user avalability
    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(400).json({ message: 'Invalid Email. Please Try Again.' });
    } else {

      //check for password similarity
      const isPassword = await bcrypt.compare(password, user.password);

      if (isPassword) {
        res.status(200).json({ data: user, message: 'Successfully Logged In' });
      } else {
        res.status(400).json({ message: 'Invalid Password. Please Try Again.' });
      }

    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to login user', error: err });
  }
};

module.exports = login;