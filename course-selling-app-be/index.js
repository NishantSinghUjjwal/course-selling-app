require('dotenv').config()

const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors');
const { adminRouter } = require('./routes/admin');
const { userRouter } = require('./routes/user');
app.use(express.json());
app.use(cors())
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)


app.use("/admin", adminRouter)
app.use("/users", userRouter)


// Listening to port
app.listen(process.env.PORT_NUMBER, () => {
    console.log("Listening on PORT " + process.env.PORT_NUMBER)
})