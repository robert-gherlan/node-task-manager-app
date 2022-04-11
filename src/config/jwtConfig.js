// Default values for configurations
const defaultJwtSecretKey = 'wqcle66p1a01zu4qgw5xjlbj5y8n7el5tbzj52oyxy50gefp'
const defaultJwtAlgorithm = 'HS256'
const defaultJwtAccessTokenExpiresIn = '1 week'

// Actual configurations
const jwtSecretKey = process.env.JWT_SECRET_KEY || defaultJwtSecretKey
const jwtAlgorithm = process.env.JWT_ALGORITHM || defaultJwtAlgorithm
const jwtAccessTokenExpiresIn =
  process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || defaultJwtAccessTokenExpiresIn

module.exports = {
  jwtSecretKey: jwtSecretKey,
  jwtAlgorithm: jwtAlgorithm,
  jwtAccessTokenExpiresIn: jwtAccessTokenExpiresIn
}
