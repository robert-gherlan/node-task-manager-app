const defaultDbURL = 'mongodb://127.0.0.1:27017/task-manager'

const defaultPort = 3000

const dbConnectionURL = process.env.MONGODB_CONNECTION_URL || defaultDbURL

const port = process.env.PORT || defaultPort

module.exports = {
  dbConnectionURL: dbConnectionURL,
  port: port
}
