const express = require("express");
require("dotenv").config()

const connectDB = require("./src/config/connectDB");

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require('cors');
// const session = require('express-session');

const jokeRouter = require("./src/routes/jokeRouters");

const START_APP = async () => {
    const app = express();
    await connectDB()
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors())
    app.use(bodyParser.json())
    app.use(cookieParser())
    // 
    app.use('/joke', jokeRouter)

    const port =process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};
START_APP()