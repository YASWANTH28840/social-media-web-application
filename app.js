const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')


const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

// Body parser------------------------
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())

// Mongodb------------------------------
//
const db = require('./config/keys').mongoURI;
mongoose
    .connect("mongodb+srv://mrinalseth3959:infant@123@cluster0.7jw4x.mongodb.net/social?retryWrites=true&w=majority",{ useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false })
    .then(()=>{console.log('DATABASE CONNECTED')})
    .catch(()=>{console.log(`DATABASE ERROR -----> ${err}`)})
//Passport Authentication----------------------
app.use(passport.initialize());
require('./config/passport.js')(passport)

//Router-------------------------------
app.use('/api/user',users)
app.use('/api/profile',profile)
app.use('/api/post',posts)

// Server static asset
if(process.env.NODE_ENV === 'production'){
   app.use(express.static('client/build'))

   app.get('*',(req, res) => {
 res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) 
    })
}
//-----------------------
const port = process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server Started on ${port}`)
})