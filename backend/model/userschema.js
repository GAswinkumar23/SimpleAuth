const mongoose =require('mongoose');

const userschema =new mongoose.Schema({
    name: String,
    email:{ type: String, required: true, unique: true },
     phone:String,
     location:String,
     category:String,
     password: String,
     signupDate:String
});

module.exports=mongoose.model("User",userschema);