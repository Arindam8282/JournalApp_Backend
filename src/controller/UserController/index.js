const CoreUtils = require("../../CoreUtils")
const {JWT} = require("../../middlewares/auth")
const { UserModel } = require("../../models/DbModels/userModel")

const UserController = {
  getUser : (Request,res)=> {
    console.log(Request.headers.user)
    return res.status(200).send(Request.headers.user)
  },
  createUser : async (Request,res)=>{   
    let error = new UserModel(Request.body).validateSync()
    if(error!==undefined) {
      console.log(error.errors[Object.keys(error.errors)[0]].message)    
      return res.status(400).send(error.errors)
    }
    else {
      const password = await CoreUtils.encryptPassword(Request.body.password)
      let newUser = {...Request.body,
        password: password,
        userName: CoreUtils.newUserName(Request.body)
      }
      const User = new UserModel(newUser)
      User.save()
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
  loginUser: async(Request,res) => {
    if(!Request.body.password) return res.status(404).send({message:"user not found"})
    const user = await UserModel.findOne({ email: Request.body.email });
    if(user) {
      const validPassword = await CoreUtils.comparePassword(Request.body.password,user.password)
      if(validPassword)
        return res.status(200).send({message:'Logged in successfully',data:{token:JWT.sign({_id: user._id, email: Request.body.email})}})
      else
        return res.status(200).send({message:'Invalid user and password'})
    }
    else return res.status(404).send({message:"user not found"})
  }
}
module.exports = UserController