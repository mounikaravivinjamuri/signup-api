const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model')
const bcrypt = require('bcrypt')
const dns=require('dns');
dns.setServers(['8.8.8.8','8.8.4.4']);
const app = express();
app.use(express.json())
mongoose.connect("mongodb+srv://mounikaravivinjamuri_db_user:h6MMbFhzdAU54vYn@cluster0.zry2akr.mongodb.net")
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

 app.post("/login", async (req,res)=>{
    const {email,password}= req.body;
    try{
       const found_user = await userData.findOne({email})
       if(!found_user){
         return res.json({message:"user not found"})
       }
       const ismatch=await bcrypt.compare(password,found_user.password)//(paintext,database hashed password)
       if(!ismatch){
        return res.json({err:"invalid password"})
       }
       return res.json({message:"user login",
                        username:found_user.username
       })
      }
       catch(err){
       console.log(err.message)
       }
      })











app.listen(3000, ()=> console.log("server is runnning.."))
