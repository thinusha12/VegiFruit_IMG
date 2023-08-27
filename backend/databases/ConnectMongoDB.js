const mongoose = require('mongoose');

const ConnectMongoDB = (URL) => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(URL);
    console.log('Successfully Connected to MongoDB');
  } catch (err) {
    console.log('MongoDB Connection Failed');
  }
};

module.exports = ConnectMongoDB;
