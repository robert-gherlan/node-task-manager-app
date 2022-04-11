const {
  jwtSecretKey,
  jwtAlgorithm,
  jwtAccessTokenExpiresIn
} = require('../config/jwtConfig')
const jwt = require('jsonwebtoken')

const signToken = async user => {
  const token = jwt.sign(
    { _id: user._id.toString(), email: user.email },
    jwtSecretKey,
    {
      expiresIn: jwtAccessTokenExpiresIn,
      algorithm: jwtAlgorithm
    }
  )

  return token
}

const verifyToken = async token => {
  return jwt.verify(token, jwtSecretKey, { algorithms: jwtAlgorithm })
}

module.exports = { signToken: signToken, verifyToken: verifyToken }
