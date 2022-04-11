const mongoose = require('mongoose')
const validator = require('validator')
const { hash, matches } = require('../utils/auth')
const jwt = require('../utils/jwt')
const Task = require('../models/task')

const userSchema = new mongoose.Schema(
  {
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
    },
    avatar: {
      type: Buffer
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Add 'tasks' virtual reference
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// To JSON
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

// Generate token
userSchema.methods.generateToken = async function () {
  const token = await jwt.signToken(this)
  this.tokens = this.tokens.concat({ token: token })
  await this.save()

  return token
}

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

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  await Task.deleteMany({ owner: this._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
