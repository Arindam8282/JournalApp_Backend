const jwt = require('jsonwebtoken')
const constants = require('../../constants')
const bcrypt = require('bcrypt')

const JWT = {
  sign: (payload, option= { expiresIn: constants.auth.expiresIn }) => {
    return jwt.sign(payload, constants.auth.secretKey, option)
  },
  decode: (auth) => {
    const token = auth.split(' ')[1]
    if(token) {
      let resObject;
      try {
        resObject = jwt.verify(token, constants.auth.secretKey)
      } catch (error) {
        return { error:'invalid token' }
      }
      return resObject;
    }
    else return { error:'no token' }
  }
}
const CryptoGraphy = {
  encrypt: async (pass)=> {
    const salt = await bcrypt.genSalt(constants.auth.cryptSalt);
    const password = await bcrypt.hash(pass, salt);
    return password
  },
  compare: async (rawPassword,hashedPassword)=> {
    const bool = await bcrypt.compare(rawPassword,hashedPassword);
    return bool
  }
}
module.exports = {
  JWT,
  CryptoGraphy
};