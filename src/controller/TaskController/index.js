const { TaskModel } = require("../../models/DbModels/taskModel")

const TaskController = {
  getAllTasks: (Request,res)=> {
    TaskModel.find({userId:Request.body.userId})
    .then((result)=>{
      console.log(result)
      return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send({status:'Failed',message:'Not Found'})
    })
  },
  createTask: (Request,res) => {
    const Task = new TaskModel(Request.body)
    let error = Task.validateSync()
    if(error!==undefined) {
      console.log(error.errors[Object.keys(error.errors)[0]].message)    
      return res.status(400).send(error.errors)
    }
    else {
      Task.save()
      .then((result)=>{
        console.log(result)
        return res.send(result)
      })
      .catch((error)=>{
        console.log(error)
        return res.status(400).send(error)
      })
    }
  },
  getTask: (Request,res)=> {
    TaskModel.findOne({_id:Request.params['id'],userId:Request.body.userId})
    .then((result)=>{
      console.log(result)
      return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send({status:'Failed',message:'Not Found'})
    })
  },
  updateTask: (Request,res) => {
    TaskModel.findByIdAndUpdate(Request.params['id'],{editor:Request.body.editor})
    .then((result)=>{
      console.log(result)
      return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send({status:'Failed',message:'Not Found'})
    })
  },
  deleteTask: (Request,res) => {
    TaskModel.findOneAndDelete({_id:Request.params['id'],userId:Request.body.userId})
    .then((result)=>{
      console.log(result)
      return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send({status:'Failed',message:'Not Found'})
    })
  }


}
module.exports = TaskController