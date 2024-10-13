const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'hr', 'admin'],
    default: 'user',

  },

});
userSchema.pre('save', async function (next) {

  if (!this.isModified('password'))
    return next()
  this.password = await bcrypt.hash(this.password, 12)


  next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password !== '' && update.password !== undefined) {
    this.getUpdate().password = await bcrypt.hash(update.password, 12)
    update.passwordConfirm = undefined
    next()
  } else {
    next()
  }
})
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
