const express = require('express')
require('./db/mongoose')
const { port } = require('./config/config')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const authRouter = require('./routers/auth')

const app = express()

// Configure to use JSON
app.use(express.json())

// Configure routers
app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
