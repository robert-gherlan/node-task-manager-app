const mongoose = require('mongoose')
const validator = require('validator')
const { hash, matches } = require('../utils/auth')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email must be a valid email.')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate (value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must cannot contain "password".')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate (value) {
      if (value < 0) {
        throw new Error('Age must be a positive number.')
      }
    }
  }
})

// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }

  const passwordMatches = await matches(user.password, password)
  if (!passwordMatches) {
    throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
