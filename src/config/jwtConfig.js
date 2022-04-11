const jwtSecretKey =
  process.env.JWT_SECRET_KEY ||
  'wqcle66p1a01zu4qgw5xjlbj5y8n7el5tbzj52oyxy50gefp'
const jwtAlgorithm = process.env.JWT_ALGORITHM || 'HS256'
const jwtAccessTokenExpiresIn =
  process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1 day'

module.exports = {
  jwtSecretKey: jwtSecretKey,
  jwtAlgorithm: jwtAlgorithm,
  jwtAccessTokenExpiresIn: jwtAccessTokenExpiresIn
}
