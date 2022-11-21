require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { DbConnect } = require('./db')
const Routes = require('./routes/index')
const CoreUtils = require('./CoreUtils')
const app = express()
const path = require('path')
DbConnect();

app.use(express.static(path.join(__dirname,'build')))
app.use(express.json());
app.use(cors({origin:"*"}))
// app.use(CoreUtils.isRequestBodyNullOrUndefined)



app.get('/',function(req,res){
  // res.sendFile('index.html',{root: path.join(__dirname,'/build')})
  // res.sendFile(path.resolve(__dirname+'/build/','index.html'))
  res.sendFile(path.join(__dirname, 'build', 'index.html'));

})
Routes(app);

app.listen(process.env.SERVER_PORT,()=>{
  console.log("App running on port : ",process.env.SERVER_PORT)
})