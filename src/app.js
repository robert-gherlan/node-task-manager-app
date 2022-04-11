const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const authRouter = require('./routers/auth')
const { model } = require('./db/mongoose')

const app = express()

// Configure to use JSON
app.use(express.json())

// Configure routers
app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

module.exports = app
