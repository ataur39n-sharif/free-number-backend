require('dotenv').config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', require('./Routes/index'))

//mongoDB connection setup
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connect with db'))
    .catch(error => console.log(error.message))

app.listen(8000 || process.env.PORT, () => {
    console.log(`application running on port ${process.env.PORT}`)
})