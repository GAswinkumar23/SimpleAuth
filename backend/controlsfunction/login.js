const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userschema');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existing_user = await User.findOne({ email });
        if (!existing_user) {
            console.log(`User not registered: ${email}`);
            return res.status(404).json({ message: "User not registered" });
        }

        const isMatch = await bcrypt.compare(password, existing_user.password);
        if (!isMatch) {
            console.log(`Invalid password for user: ${email}`);
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { userId: existing_user._id, email: existing_user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(`User logged in: ${email}`);

        return res.status(200).json({
            message: "User login successful",
            token,
            user: {
                id: existing_user._id,
                email: existing_user.email,
                username: existing_user.username,
            }
        });
    } catch (error) {
        console.error(`Error during login: ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = login;