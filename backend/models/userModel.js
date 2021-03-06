const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "required"]
  },
  email: {
    type: String,
    required: [true, "required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "required"]
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
})


userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//middlware that salts and hashes password when user profile is created
//pre('save') allows this to fire before something is saved to the db
userSchema.pre('save', async function (next) {
  //checks that user password is not modified when they modify other fields in the future
  //isModified('password') comes from Mongoose
  if(!this.isModified('password')){
    next()
  }

  //using bcrypt to secure password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User;