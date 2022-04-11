const { port } = require('./config/config')
const app = require('./index')

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
