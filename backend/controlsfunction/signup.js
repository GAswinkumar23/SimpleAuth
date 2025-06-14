const bcrypt = require("bcryptjs");
const User = require('../model/userschema');

const signup = async (req, res) => {
    try {
        const { name, email, phone,location,category,signupDate, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone,location,category,signupDate, password: hashedPassword });
        await newUser.save();

        console.log(`Signup attempt: Name=${name}, Email=${email}`);

        console.log(`New user created: ${email}`);
        res.status(201).json({ message: "User added successfully and data encrypted." });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200)
};

module.exports = signup;