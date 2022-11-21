const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required: true
  },
  firstName: {
    type: String,
    minLength: [3,"few letters for a name"],
    maxLength: [30,"too many letters for a name"],
    required: true,
  },
  lastName:{
    type: String,
    minLength: [3,"few letters for a name"],
    maxLength: [30,"too many letters for a name"],
    required: true
  },
  address:{
    type: String,
    minLength: [5,"few letters for a name"],
    maxLength: [1000,"too many letters for a name"],
  },
  email:{
    type: String,    
    minLength: [3,"few letters for a name"],
    maxLength: [100,"too many letters for a name"],
    unique: true,
    validate: (value) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(value)
    }
  },
  phoneNumbers: {
    type: [{
      type: String,
      maxLength: [13, "enter a 13 digit number"],
      minLength: [10, "enter a 10 digit number"],
    }],
    validate: [(arr) => {
      return arr.length > 0 && arr.length < 3 
    }, "length has to be 1-2"],
    required: true,
  }
})
const ContactModel = mongoose.model('contacts', ContactSchema)

module.exports = {
  ContactModel
}
