const mongoose = require('mongoose')
const { dbConnectionURL } = require('../config/config')

mongoose
  .connect(dbConnectionURL)
  .then(() => {
    console.log('The MongoDB connection was successful.')
  })
  .catch(error => {
    console.error('The MongoDB connection failed.', error)
  })

module.exports = mongoose
