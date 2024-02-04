const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const bcrypt = require('bcrypt');

const transferMoney = async (req, res) => {
    console.log("recieved=",req.body)
    try {
        const sender = await User.findOne({ username: req.body.sender });
        const receiver = await User.findOne({ username: req.body.receiver_username });
        // console.log("before sender=",sender.balance," receiver=",receiver.balance)
        if(!sender || !receiver){
            return res.status(404).json("user not found");
        }
        const validPassword = await bcrypt.compare(req.body.password, sender.password);
        if(!validPassword){
            return res.status(400).json("wrong password");
        } 
        if(sender.balance < req.body.amount){
            return res.status(400).json("insufficient balance");
        }
        await sender.updateOne({ $inc: { balance: -req.body.amount } });
        await receiver.updateOne({ $inc: { balance: req.body.amount } });

        // console.log("after sender=",sender.balance," receiver=",receiver.balance)
        const newTransaction = new Transaction({
            sender: sender.username,
            receiver: receiver.username,
            amount: req.body.amount,
            sender_balance: sender.balance - req.body.amount,
            receiver_balance: receiver.balance + req.body.amount
        });
        const transaction = await newTransaction.save();
        res.status(200).json(transaction);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const getUserByUsername = async (req, res) => {
    console.log("recieved=",req.params)
    try {
        const user = await User.findOne({ username: req.params.username });
        if(!user){
            return res.status(404).json("user not found");
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const getUserTransactions = async (req, res) => {
    console.log("recieved=",req.params)
    try {
        const username=req.params.username;
        const transactions = await Transaction.find({ $or: [{ sender: username }, { receiver: username }] });
        if(!transactions){
            return res.status(404).json("user not found");
        }
        const sortedData= transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const balanceHistory=[];
        const moneySent=[];
        const moneyReceived=[];
        for(let i=0; i<sortedData.length; i++){
            if(sortedData[i].sender === username){
                balanceHistory.push({date: sortedData[i].createdAt, balance: sortedData[i].sender_balance})
                moneySent.push({date: sortedData[i].createdAt, amount: sortedData[i].amount})
            }  else{
                balanceHistory.push({date: sortedData[i].createdAt, balance: sortedData[i].receiver_balance})
                moneyReceived.push({date: sortedData[i].createdAt, amount: sortedData[i].amount})
            }
        }
        res.status(200).json({sortedData,balanceHistory,moneySent,moneyReceived});

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = { transferMoney,getUserByUsername,getUserTransactions }
