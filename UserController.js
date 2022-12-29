const express = require('express')
const router = express.Router();
const User=require('./models/User')
const bcrypt=require('bcryptjs');
const {createTokens} = require("./JWT");

const register= async (req,res)=>{
    const { email, username, password } = req.body;

    if (!username || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    const hashed_pwd= await bcrypt.hash(password, 12)
    const user = await User.create({
       email:email,
       username:username,
       password:hashed_pwd
    })
    if (user) res.end();
    else {
        res.status(400)
        throw new Error('Invalid user data')
      }
};

const login = async (req,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password,user.password)){
        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });
    }else {
        res.status(401);
        throw new Error("Invalid Email and password combination");
}

    res.end();
};
const getUsers=async(req,res)=>{
    res.json(await User.find().select('username -_id'));
};

const logout=(req,res)=>{
    res.cookie('access-token','',{maxAge:1});
    res.end();
};
module.exports={register, login, getUsers, logout}