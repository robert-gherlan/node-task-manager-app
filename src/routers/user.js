const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()
const upload = multer({
  limits: { fileSize: 1_000_000 },
  fileFilter (request, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Please upload an image.'))
    }
    callback(undefined, true)
  }
})

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

router.post(
  '/v1/users/me/avatar',
  [auth, upload.single('avatar')],
  async (request, response) => {
    const buffer = await sharp(request.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()
    request.user.avatar = buffer
    await request.user.save()
    response.send()
  },
  (error, request, response, next) => {
    response.status(400).send({ error: error.message })
  }
)

router.get('/v1/users/:id/avatar', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
    if (!user || !user.avatar) {
      throw new Error('No avatar found.')
    }

    response.set('Content-Type', 'image/png')
    response.send(user.avatar)
  } catch (error) {
    console.error('Failed to get user avatar.', error)
    response.status(404).send()
  }
})

router.delete('/v1/users/me/avatar', auth, async (request, response) => {
  request.user.avatar = undefined
  await request.user.save()
  response.status(204).send()
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
