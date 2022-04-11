const dbConnectionURL = process.env.MONGODB_CONNECTION_URL
const port = process.env.PORT || 3000

module.exports = {
  dbConnectionURL: dbConnectionURL,
  port: port
}
