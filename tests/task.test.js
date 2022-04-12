const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userTwo, taskOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/v1/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'description',
      completed: true
    })
    .expect(201)

  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.description).toBe('description')
  expect(task.completed).toEqual(true)
})

test('Should get user tasks', async () => {
  const response = await request(app)
    .get('/v1/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(response.body.length).toEqual(2)
})

test('Should not delete others user task', async () => {
  await request(app)
    .delete(`/v1/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

  const task = await Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})
