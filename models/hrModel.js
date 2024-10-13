const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hrSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'hr'
  },

});
hrSchema.pre('save', async function (next) {

  if (!this.isModified('password'))
    return next()
  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

hrSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password !== '' && update.password !== undefined && update.password == update.passwordConfirm) {
    this.getUpdate().password = await bcrypt.hash(update.password, 12)
    update.passwordConfirm = undefined
    next()
  } else {
    next()
  }
})
hrSchema.methods.correctPassword = async function (
  candidatePassword,
  hrPassword
) {
  return await bcrypt.compare(candidatePassword, hrPassword)
}

const hr = mongoose.model('hr', hrSchema);

module.exports = hr;
