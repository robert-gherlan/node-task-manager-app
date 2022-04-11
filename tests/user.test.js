const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
  name: 'Robert',
  email: 'robert@example.com',
  password: '123asdfg678'
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('Should sign up a new user', async () => {
  await request(app)
    .post('/v1/users')
    .send({
      name: 'test',
      email: 'test@example.com',
      password: 'testpas123'
    })
    .expect(201)
})

test('Should login existing user', async () => {
  await request(app)
    .post('/v1/login')
    .send(userOne)
    .expect(200)
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
