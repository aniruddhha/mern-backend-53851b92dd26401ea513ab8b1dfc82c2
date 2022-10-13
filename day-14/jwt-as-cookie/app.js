const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.post('/login', express.json() ,(req, res) => {

    const userDetails = req.body
    const token = jwt.sign(
       userDetails, 
        'abc123', 
        {  algorithm : 'HS256' }
    )

    res.cookie('jwt_access_token', token, {
        httpOnly : true
    }).status(200)
      .json({ sts : 'user logged successfully' })
})

app.get('/balance', cookieParser() ,(req, res) => {
    console.log(req.cookies)
    res.json({
        balance : 100
    })
})

app.listen(6000, () => {
    console.log('✅ Server Running Successfully')
})
