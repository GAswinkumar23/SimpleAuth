const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User=require('../model/userschema')
require('dotenv').config(); 

const login = async (req,res)=>{
   
    try{
        const {email,password}=req.body;
        const existing_user=await User.findOne({email});
        if(!existing_user){
    
            console.log(`the user is not registered ${email}`);
            return res.status(404).json({message:"the user is not registered"});
        }
            const ismatch=await bcrypt.compare(password,existing_user.password);
            if(!ismatch)
                {
                    return res.status(404).json({message:"the password is not matches"});
                }
                else{
                    res.json({message:"the userlogin sucessfully"});
                }
    }
    catch(error)
    {
        console.error(`the error occur ${error}`);
    }
}

module.exports = login;