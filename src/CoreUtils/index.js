const { CryptoGraphy,JWT } = require("../middlewares/auth");

const CoreUtils = {
  isRequestBodyNullOrUndefined: (req,res,next)=> {
    if(req.body 
    && Object.keys(req.body).length === 0
    && Object.getPrototypeOf(req.body) === Object.prototype) {
      return res.status(400).send({status:'error',message:'no body present'})
    }
    next()
  },
  newUserName : ({ firstName, lastName }) => {
    return firstName[0].toLowerCase() + lastName.toLowerCase() + Date.now();
  },
  isAuthorized: (req,res,next)=> {
    if(!req.headers.authorization) {
      return res.status(403).send({
        message: {
          error: 'unauthorized'
        }
      })
    }
    else {
      const isAuth = JWT.decode(req.headers.authorization) 
      if(isAuth.error) return res.status(400).send(isAuth.error)
      req.headers.user = isAuth;
      next()
    }
  },
  encryptPassword: async (password)=> {
    return await CryptoGraphy.encrypt(password)
  },
  comparePassword: async (actualpassword,hashedpassword)=> {
    return await CryptoGraphy.compare(actualpassword,hashedpassword)
  }
}
module.exports = CoreUtils