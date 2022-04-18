const { port } = require('./config/config')
const app = require('./app')

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
