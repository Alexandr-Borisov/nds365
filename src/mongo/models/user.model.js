const mongoose = require('mongoose')

const statusSchema = mongoose.Schema({
  industry: String,
  bussines: String,
})

module.exports = mongoose.model('Status', statusSchema)
