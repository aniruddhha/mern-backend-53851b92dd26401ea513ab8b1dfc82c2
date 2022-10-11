// 2. Integrate with mongo
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/test');

const AppUserSchema = new mongoose.Schema({
    userName : { type: String, unique : true },
    password : { type: String },
})
const AppUser = mongoose.model('AppUser', AppUserSchema)

// 1. Setup Express App
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const { expressjwt } = require("express-jwt");

app.post('/login', express.json() ,(req, res) => {
    const { userName, password } = req.body

    AppUser.findOne({ userName , password }, (err, appUser) => {
        if(err) {
            console.log('❌ Db Error')
            res.json( { sts : 'fail', msg :'Db Error' })
        }
        if(appUser == null) {
            console.log('❌ User Not Found')
            res.json( { sts : 'fail', msg :'❌ User Not Found' })
        }

        console.log(appUser)

        const token = jwt.sign(
            {...appUser}, 
            'abc123', 
            {  algorithm : 'HS256' }
        )

        res.json({ 
            sts: 'sucess', 
            token , 
            msg :'✅ User LoggedIn Successfully' 
        })
    })
})

// 👇 this endpoint needs to be accessible only to admin users
app.post('/newuser', 
    express.json(), // converts json string to javascript object
    expressjwt({ secret: "abc123", algorithms: ["HS256"] }) , // first 3 steps are performed by this
    (req, res) => {
    // 1. extract the token from request header
    // 2. you need to verify that token and extract the details
    // 3. extracted details needs made available for use 
    // 4. check user role if admin then and only then perform this action
    // 5. if user is normal user, return 401 Unauthorized status

    console.log(req.auth)
    const { role } = req.auth._doc
    if(role && role == 'admin') res.json( { sts : 'Create New User' } )
    else  res.status(401).json( { sts : 'Unauthorized' } )
})

app.get('/balance', expressjwt({ secret: "abc123", algorithms: ["HS256"] }) , (req, res) => {
    // if you have token, then and only then I will allow to check the balance
    // here client will pass the token for request header. 
    // this end point will verify the token and check for validity

    // 1. extract the token from request header
    // 2. you need to verify that token and extract the details
    // 3. extracted details needs made available for use

    console.log(req.auth)
    res.json({ sts : 'success', dt : req.auth })

})

app.put('/withdraw', expressjwt({ secret: "abc123", algorithms: ["HS256"] }) ,(req, res) => {
     // 1. extract the token from request header
    // 2. you need to verify that token and extract the details
    // 3. extracted details needs made available for use

    res.json({ sts : 'updating' })
} )

app.listen(6000, () => {
    console.log('✅ Server Running Successfully')
})

// 3. Add Jwt Security


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjU0MTc1NzN9.X6gHr7sgmWde8kTtRzwN75qitIv1bxtzP4e204ZZpH0c
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFiYzEyMyIsInBhc3N3b3JkIjoiYWJjMTIzIiwiaWQiOiI2MzQwNTA5MmVmN2ZjY2NhODY5Y2NlYzYiLCJpYXQiOjE2NjU0MTc2ODB9.3RyAScFVxjlFFdaazBSeH6YlhCUeL0UGT8fv-hrZtOs