const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model')
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json())
mongoose.connect("mongodb+srv://loginsa80_db_user:JahDfkUyWSRqIjTs@cluster0.oo49k08.mongodb.net/")
.then(()=> console.log("database connected"))         
.catch((err)=>console.log(err.message))


app.post("/signup", async (req,res)=>{
    const {username , email, password}= req.body;
    try{
       const existed_user = await userData.findOne({email})
       if(existed_user){
         return res.json({message:"user already exisited"})
       }
       const salt = await bcrypt.genSalt(10);
       const hashed_password = await bcrypt.hash(password,salt)

       const user = new userData({
        username,
        email,
        password:hashed_password
       })
       await user.save()
       return res.json({message:"user signup",
         username: user.username,
         password:user.password
       });
    }
    catch(err){
        console.log(err.message)
    }
})


app.listen(3000, ()=> console.log("server is runnning.."))