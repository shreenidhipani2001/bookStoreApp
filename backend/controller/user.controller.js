import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
export const signUp=async(req,res)=>{
    try{
        //req the body from postman api
        const {fullname,email,password}=req.body;
        //search if user is there or not through findOne()
        const user=await User.findOne({email});
        //check the user is there or not
        if(user){
            return res.status(400).json({message:"User already exists..."})
        }
        //hash the password 
        /**
         * 
         var bcrypt = require('bcryptjs');

const generateHashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds)
}

const compareHashPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


const addUser = async (req, res) => {
    try {
        const isExist = await User.findOne({ email: req.body.email });
        if (isExist)
            return res.status(400).json({
                message: `the user already exist`
            })

        const newUser = new User({
            id: getUniqueId(),
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: generateHashPassword(req.body.password)
        });
        const user = await newUser.save();
        if (!user)
            return res.status(400).json({
                message: "user was not created"
            });

        return res.status(201).json({
            message: "user was created"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}; 
          
          
          
         
         */
       const hashPassword=await bcryptjs.hash(password,10);
        //if not there then create the user
        const createdUser=new User({
            fullname:fullname,
            email:email,
            password:hashPassword,
        })
        await  createdUser.save()
        res.status(201).json({message:"Successfully Registered",user:{
            _id:createdUser._id,
            fullname:createdUser.fullname,
            email:createdUser.email
        }})

    }catch(error){
            console.log("Error --",error);
            res.status(500).json({message:"Error please check the credentials properly or reload"})
    }
};


//Login Controller

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});

        const isPasswordMatch=await bcryptjs.compare(password,user.password);
        if(!user || !isPasswordMatch){
            return res.status(400).json({message:"Invalid Fullname or Password "})
        }else{
            res.status(200).json({message:"Login successful",user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email
            }})
        }
    } catch (error) {
        console.log("Error --",error.message);
        res.status(500).json({message:"Error please check the credentials properly or reload"})

    }
};