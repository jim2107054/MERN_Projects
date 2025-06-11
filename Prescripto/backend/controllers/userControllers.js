import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// api to register user.
export const registerUser = async (req,res)=>{
    // console.log(req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({success:false, message: "Please fill all the details" });
        }
        //check the email is valid or not
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email" });
        }

        //check the password length
        if(password.length < 8){
            return res.json({success:false, message: "Enter a strong password" });
        }

        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false, message: "User already exists" });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create a new user
        // FIX: Removed 'new' keyword and added 'await' to properly create and save the user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        // console.log(newUser)

        //create a token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.json({success:true,token, message: "User registered successfully", user: newUser });

    } catch (error) {
        res.json({success:false, message: "Internal Server Error" });
    }
}