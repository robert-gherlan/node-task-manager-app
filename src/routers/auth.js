const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/v1/login', async (request, response) => {
  try {
    const email = request.body.email
    const password = request.body.password
    const user = await User.findByCredentials(email, password)
    const token = await user.generateToken()
    response.send({ user, token })
  } catch (error) {
    console.log('Failed to login user.', error)
    response.status(401).send()
  }
})

router.post('/v1/logout', auth, async (request, response) => {
  try {
    request.user.tokens = request.user.tokens.filter(
      token => token.token !== request.token
    )
    await request.user.save()

    response.send()
  } catch (error) {
    console.log('Failed to logout user.', error)
    response.status(500).send()
  }
})

router.post('/v1/logout/all', auth, async (request, response) => {
  try {
    request.user.tokens = []
    await request.user.save()

    response.send()
  } catch (error) {
    console.log('Failed to logout user.', error)
    response.status(500).send()
  }
})

module.exports = router
