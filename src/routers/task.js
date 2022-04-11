const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/v1/tasks', auth, async (request, response) => {
  const task = new Task({
    ...request.body,
    owner: request.user._id
  })
  try {
    await task.save()
    response.status(201).send(task)
  } catch (error) {
    console.error('Failed to save task.', task, error)
    response.status(400).send(error)
  }
})

router.get('/v1/tasks', auth, async (request, response) => {
  try {
    await request.user.populate('tasks')
    response.send(request.user.tasks)
  } catch (error) {
    console.error("Failed to retrieve user's tasks.", error)
    response.status(500).send()
  }
})

router.get('/v1/tasks/:id', auth, async (request, response) => {
  const _id = request.params.id
  try {
    const task = await Task.findOne({ _id, owner: request.user._id })
    if (!task) {
      return response.status(404).send()
    }

    response.send(task)
  } catch (error) {
    console.error('Failed to retrieve task with id.', _id, error)
    response.status(500).send()
  }
})

router.patch('/v1/tasks/:id', auth, async (request, response) => {
  const updates = Object.keys(request.body)
  const allowedUpdates = new Set(['description', 'completed'])
  const isValidOperation = updates.every(update => allowedUpdates.has(update))
  if (!isValidOperation) {
    return response.status(400).send({
      error: 'Invalid updates.',
      allowedUpdates: [...allowedUpdates]
    })
  }

  const _id = request.params.id
  try {
    const task = await Task.findOne({ _id, owner: request.user._id })

    if (!task) {
      return response.status(404).send()
    }

    updates.forEach(update => (task[update] = request.body[update]))
    await task.save()

    response.send(task)
  } catch (error) {
    console.error('Failed to update task with id.', _id, error)
    response.status(400).send(error)
  }
})

router.delete('/v1/tasks/:id', auth, async (request, response) => {
  const _id = request.params.id
  try {
    const task = await Task.findOneAndDelete({ _id, owner: request.user._id })
    if (!task) {
      return response.status(404).send()
    }

    response.status(204).send()
  } catch (error) {
    console.error('Failed to delete task with id.', _id, error)
    response.status(500).send()
  }
})

module.exports = router
