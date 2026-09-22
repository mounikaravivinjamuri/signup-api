const mongoose = require('mongoose');
const userData = mongoose.Schema({
    username:{
        type : String,
        required:true
    },
     email:{
        type : String,
        required:true,
        unique: true
    },
     password:{
        type : String,
        required:true
    },
  createdAT:{
    type:Date,
    default:Date.now
  }
})
module.exports= mongoose.model("userdata", userData)