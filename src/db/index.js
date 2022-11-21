const mongoose = require('mongoose');
const DbConnect = () => {
  const uri = "mongodb+srv://darindam507:LdFaVBdWUcYUe0hB@todos.d0pshsn.mongodb.net/todos?retryWrites=true&w=majority";
  mongoose.connect(uri,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log('Mongodb Connected')
  })
  .catch((err)=>{
    console.log('lost Connection',err)
  })
}


module.exports = {
  DbConnect
}
