const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/v1/users')
    .send({
      name: 'test',
      email: 'test@example.com',
      password: 'testPass123!@'
    })
    .expect(201)

  // Assert that the database was changed correctly.
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assert about the response body
  expect(response.body.user.name).toBe('test')
  expect(response.body).toMatchObject({
    user: {
      name: 'test',
      email: 'test@example.com'
    },
    token: user.tokens[0].token
  })

  // Test not plain password saved in DB
  expect(user.password).not.toBe('testPass123!@')
})

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/v1/login')
    .send(userOne)
    .expect(200)

  const user = await User.findById(userOne._id)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non existing user', async () => {
  await request(app)
    .post('/v1/login')
    .send({
      email: 'nonexistinguser@example.com',
      password: userOne.password
    })
    .expect(401)
})

test('Should not login user with invalid password', async () => {
  await request(app)
    .post('/v1/login')
    .send({
      email: userOne.email,
      password: 'invalidPassword'
    })
    .expect(401)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/v1/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/v1/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/v1/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(204)

  const user = await User.findById(userOne._id)
  expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/v1/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image for user', async () => {
  await request(app)
    .post('/v1/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

  const user = await User.findById(userOne._id)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/v1/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'John' })
    .expect(200)

  const user = await User.findById(userOne._id)
  expect(user.name).toBe('John')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/v1/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'England' })
    .expect(400)

  const user = await User.findById(userOne._id)
  expect(user.location).toBeUndefined()
})
