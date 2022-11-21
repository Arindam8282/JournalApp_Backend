const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required: true
  },
  editor:{
    type: String,
    required: true,
    minLength: [4,"few letters to understand a task"],
    maxLength: 1000
  }
})
const TaskModel = mongoose.model('tasks', TaskSchema)

module.exports = {
  TaskModel
}
