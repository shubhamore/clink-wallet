const express = require("express");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();
const connectDb = require("./config/connectDb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/auth", require("./routes/authRoute"));

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`server running on ${port}`);
    });
});
