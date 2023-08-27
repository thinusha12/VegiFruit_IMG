const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true, default: 'USER'},
  photo: {type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;