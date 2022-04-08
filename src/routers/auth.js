const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/v1/login', async (request, response) => {
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    )
    response.send(user)
  } catch (error) {
    console.log('Failed to login user.', error)
    response.status(401).send()
  }
})

module.exports = router
