const argon2 = require('argon2')

const hash = async password => {
  try {
    return await argon2.hash(password)
  } catch (error) {
    console.error('Failed to hash provided value.', error)
  }
}

const matches = async (hash, password) => {
  try {
    return await argon2.verify(hash, password)
  } catch (error) {
    console.error('Failed to verify provided hash.', error)
  }
}

module.exports = {
  hash: hash,
  matches: matches
}
