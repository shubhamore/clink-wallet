const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log("recieved=",req.body)
    try {
        const user1 = await User.findOne({ username: req.body.username });
        if(user1){
            return res.status(400).json("username already exists");
        }
        const user2 = await User.findOne({ email: req.body.email });
        if(user2){
            return res.status(400).json("email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const balance = ((Math.random() * 10000)+1000).toFixed(2);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            balance: balance
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    console.log('register')
}

const login = async (req, res) => {
    console.log("recieved=",req.body)
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user){
            return res.status(404).json("user not found");
        } 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json("wrong password");
        } 
        const { password, ...others } = user._doc;
        const accessToken = jwt.sign({ id: user._id, userType: user.userType }, process.env.SECRET_KEY, { expiresIn: "5d" });
        res.status(200).json({ ...others, accessToken });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const verifyToken = (req, res, next) => {
    try{
        let token=req.header("Authorization")

        if(!token) return res.status(401).json("you are not authenticated")

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft()
        }

        const verified=jwt.verify(token,process.env.SECRET_KEY)
        req.user=verified
        res.status(200).json(verified)
    } catch(err){
        console.log("authController.js verifyToken error",err)
        res.status(500).json(err);
    }
}

module.exports = {
    register,
    login,
    verifyToken
};