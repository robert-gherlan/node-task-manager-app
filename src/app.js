const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const authRouter = require('./routers/auth')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const app = express()

// Configure to use JSON
app.use(express.json())

// Configure Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Configure routers
app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

module.exports = app
