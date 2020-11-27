const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
  indusrty: String,
  bussines: String,
  email: String,
});

module.exports = mongoose.model('Status', statusSchema);
