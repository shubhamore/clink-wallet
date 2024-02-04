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

userSchema.pre("save", function (next) {
    if (typeof this.balance === "number") {
        this.balance = parseFloat(this.balance.toFixed(2));
    }
    next();
});

module.exports = mongoose.model("User", userSchema);