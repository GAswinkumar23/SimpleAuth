const express = require('express');
const loginrouter = express.Router();
const login=require("../controlsfunction/login");
const User=require("../model/userschema");
const verifyToken=require("../controlsfunction/verifytoken");

loginrouter.post('/',login);
loginrouter.post("/verify", verifyToken, async (req, res) => {
    try {
        const { email } = req.body; 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Token valid, user authenticated",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
module.exports=loginrouter;