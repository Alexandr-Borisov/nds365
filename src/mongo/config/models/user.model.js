const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
  indusrty: String,
  bussines: String,
});

module.exports = mongoose.model('Status', statusSchema);
