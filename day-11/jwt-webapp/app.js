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
        res.json({ 
            sts: 'sucess', 
            token :'not implemented yet', 
            msg :'✅ User LoggedIn Successfully' 
        })
    })
})
app.listen(6000, () => {
    console.log('✅ Server Running Successfully')
})

// 3. Add Jwt Security