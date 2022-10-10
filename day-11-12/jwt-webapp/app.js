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
            appUser, 
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
app.listen(6000, () => {
    console.log('✅ Server Running Successfully')
})

// 3. Add Jwt Security


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjU0MTc1NzN9.X6gHr7sgmWde8kTtRzwN75qitIv1bxtzP4e204ZZpH0c
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFiYzEyMyIsInBhc3N3b3JkIjoiYWJjMTIzIiwiaWQiOiI2MzQwNTA5MmVmN2ZjY2NhODY5Y2NlYzYiLCJpYXQiOjE2NjU0MTc2ODB9.3RyAScFVxjlFFdaazBSeH6YlhCUeL0UGT8fv-hrZtOs