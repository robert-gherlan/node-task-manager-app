const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/v1/users', async (request, response) => {
  const user = new User(request.body)

  try {
    await user.save()
    const token = await user.generateToken()
    response.status(201).send({ user, token })
  } catch (error) {
    console.error('Failed to save user.', user, error)
    response.status(400).send(error)
  }
})

router.get('/v1/users/me', auth, async (request, response) => {
  response.send(request.user)
})

router.patch('/v1/users/me', auth, async (request, response) => {
  const updates = Object.keys(request.body)
  const allowedUpdates = new Set(['name', 'email', 'password', 'age'])
  const isValidOperation = updates.every(update => allowedUpdates.has(update))
  if (!isValidOperation) {
    return response.status(400).send({
      error: 'Invalid updates.',
      allowedUpdates: [...allowedUpdates]
    })
  }

  try {
    updates.forEach(update => (request.user[update] = request.body[update]))
    await request.user.save()

    response.send(request.user)
  } catch (error) {
    console.error('Failed to update user with id.', request.user._id, error)
    response.status(400).send(error)
  }
})

router.delete('/v1/users/me', auth, async (request, response) => {
  try {
    await request.user.remove()
    response.status(204).send()
  } catch (error) {
    console.error('Failed to delete user with id.', request.user._id, error)
    response.status(500).send()
  }
})

module.exports = router
