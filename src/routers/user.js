const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/v1/users', async (request, response) => {
  const user = new User(request.body)

  try {
    await user.save()
    response.status(201).send(user)
  } catch (error) {
    console.error('Failed to save user.', user, error)
    response.status(400).send(error)
  }
})

router.get('/v1/users', async (request, response) => {
  try {
    const users = await User.find({})
    response.send(users)
  } catch (error) {
    console.error('Failed to retrieve all users.', error)
    response.status(500).send()
  }
})

router.get('/v1/users/:id', async (request, response) => {
  const _id = request.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      return response.status(404).send()
    }
    response.send(user)
  } catch (error) {
    console.error('Failed to retrieve user with id.', _id, error)
    response.status(500).send()
  }
})

router.patch('/v1/users/:id', async (request, response) => {
  const updates = Object.keys(request.body)
  const allowedUpdates = new Set(['name', 'email', 'password', 'age'])
  const isValidOperation = updates.every(update => allowedUpdates.has(update))
  if (!isValidOperation) {
    return response.status(400).send({
      error: 'Invalid updates.',
      allowedUpdates: [...allowedUpdates]
    })
  }

  const _id = request.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      return response.status(404).send()
    }
    updates.forEach(update => (user[update] = request.body[update]))
    await user.save()

    response.send(user)
  } catch (error) {
    console.error('Failed to update user with id.', _id, error)
    response.status(400).send(error)
  }
})

router.delete('/v1/users/:id', async (request, response) => {
  const _id = request.params.id
  try {
    const user = await User.findByIdAndDelete(_id)
    if (!user) {
      return response.status(404).send()
    }
    response.status(204).send()
  } catch (error) {
    console.error('Failed to delete user with id.', _id, error)
    response.status(500).send()
  }
})

module.exports = router
