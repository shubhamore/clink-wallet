const mongoose = require("mongoose")
function connectDb() {
    return mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("connected to mongodb"));
}
module.exports = connectDb; 