const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength:[3,"few letters for a name"],
    maxLength:[30,"too many letters for a name"],
    required: true,
  },
  lastName:{
    type: String,
    minLength:[3,"few letters for a name"],
    maxLength:[30,"too many letters for a name"],
    required: true
  },
  userName:{
    type: String,
    minLength:[3,"few letters for a name"],
    maxLength:[1000,"too many letters for a name"],
    unique: true
  },
  email:{
    type: String,    
    minLength:[3,"few letters for a name"],
    maxLength:[100,"too many letters for a name"],
    required: true,
    unique: true,
    validate: (value) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(value)
    }
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
})
const UserModel = mongoose.model('users', UserSchema)

module.exports = {
  UserModel
}
