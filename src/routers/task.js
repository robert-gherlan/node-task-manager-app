const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/v1/tasks', async (request, response) => {
  const task = new Task(request.body)
  try {
    await task.save()
    response.status(201).send(task)
  } catch (error) {
    console.error('Failed to save task.', task, error)
    response.status(400).send(error)
  }
})

router.get('/v1/tasks', async (request, response) => {
  try {
    const tasks = await Task.find({})
    response.send(tasks)
  } catch (error) {
    console.error('Failed to retrieve all tasks.', error)
    response.status(500).send()
  }
})

router.get('/v1/tasks/:id', async (request, response) => {
  const _id = request.params.id

  try {
    const task = await Task.findById(_id)
    if (!task) {
      return response.status(404).send()
    }
    response.send(task)
  } catch (error) {
    console.error('Failed to retrieve task with id.', _id, error)
    response.status(500).send()
  }
})

router.patch('/v1/tasks/:id', async (request, response) => {
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
    const task = await Task.findById(_id)
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

router.delete('/v1/tasks/:id', async (request, response) => {
  const _id = request.params.id
  try {
    const task = await Task.findByIdAndDelete(_id)
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
