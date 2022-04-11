const User = require('../models/user')
const jwt = require('../utils/jwt')

const auth = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '')
    const decoded = await jwt.verifyToken(token)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error('User was not found.')
    }

    request.token = token
    request.user = user
    next()
  } catch (error) {
    console.error('Failed to authenticate the user.', error)
    response.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth
