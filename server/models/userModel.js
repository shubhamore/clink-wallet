const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    userType: { type: String, default: "user" },
    balance: { type: Number},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);