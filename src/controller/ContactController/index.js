const { ContactModel } = require("../../models/DbModels/contactModel")

const ContactController = {
  getAllContacts: (Request,res)=> {
    ContactModel.find({userId:Request.headers.user._id})
    .then((result)=>{
      console.log(result)
      return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send(new Error({status:'Failed',message:'Not Found'}))
    })
  },
  createContact: (Request,res) => {
    const Contact = new ContactModel(Request.body)
    let error = Contact.validateSync()
    if(error!==undefined) {
      console.log(error.errors[Object.keys(error.errors)[0]].message)    
      return res.status(400).send(error.errors)
    }
    else {
      Contact.save()
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
  getContact: (Request,res)=> {
    ContactModel.findOne({_id:Request.params['id'],userId:Request.headers.user._id})
    .then((result)=>{
      console.log(result)
      if(result==null) throw Error();
      else return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send({
        error:{
          status: 404,
          message: "Not found"
        }
      })
    })
  },
  updateContact: (Request,res) => {
    const Contact = new ContactModel(Request.body)
    let error = Contact.validateSync()
    if(error!==undefined) {
      console.log(error.errors[Object.keys(error.errors)[0]].message)    
      return res.status(400).send(error.errors)
    }
    else {
      ContactModel.findByIdAndUpdate(Request.params['id'],{
        firstName: Request.body.firstName,
        lastName: Request.body.lastName,
        address: Request.body.address,
        email: Request.body.email,
        phoneNumbers: Request.body.phoneNumbers
      })
      .then((result)=>{
        console.log(result)
        return res.send(result)
      })
      .catch((err)=>{
        console.log(err)
        return res.status(404).send({status:'Failed',message:'Not Found'})
      })
    }
  },
  deleteContact: (Request,res) => {
    ContactModel.findOneAndDelete({_id:Request.params['id'],userId:Request.headers.user._id})
    .then((result)=>{
      console.log(result)
      return res.send(result)
    })
    .catch((err)=>{
      console.log(err)
      return res.status(404).send({status:'Failed',message:'Not Found'})
    })
  },
  searchContacts: (Request,res)=> {
    console.log(Request.query.all)
    let pattern = /[0-9]/g;
    const Regex = new RegExp(Request.query.all,'i')
    const RegexPhone = new RegExp(Request.query.all,'gm')
    ContactModel.find({
        $or:[
          {firstName: { $regex: Regex }}, 
          {lastName: { $regex: Regex }}, 
          {address: { $regex: Regex }},
          {phoneNumbers: { $in: [RegexPhone] }}
        ]
    })
    .select('firstName lastName address phoneNumbers email')
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
module.exports = ContactController