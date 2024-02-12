const express = require('express')
const app = express()
const api = require('./routes/api')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

// const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'dist')))
// app.use(express.static(path.join(__dirname, 'node_modules')))


const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/bankDB", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))

app.use('/', api)


const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})