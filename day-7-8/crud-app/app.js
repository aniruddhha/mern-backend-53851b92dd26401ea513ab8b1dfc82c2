const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/test').then( () => {
    console.log('✅ Conncted Successfully')
} ).catch( err => {
    console.log('❌ There is a problem in connection')
})

const CarSchema = new mongoose.Schema({
    model : { type : String, unique : true },
    country : { type : Number},
    isFwd : { type : Boolean },
    make : { type : String }
})

CarSchema.pre('save', next => {
    console.log('PRE : Middleware Executed')
    next()
})

CarSchema.post('save', doc => {
    console.log('POST : Middleware Executed')
    console.log('ID : ' + doc._id)
})

CarSchema.post('save', (error, doc, next) => {
    console.log('POST : Middleware Executed')
    console.log('ID : ' + doc._id)
    if(error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Model Should be Unique'))
    } else {
        next()
    }
})

const Car = mongoose.model('Car', CarSchema )

const express = require('express')
const app = express()
app.listen(9000, () => console.log('✅ Car Server Started'))

app.post('/', express.json() ,(req, res) => {
    const reqCar = req.body // fetch the data from request
    console.log(reqCar)

    //es6 version
    const dbObj = new Car({ ...reqCar })

    dbObj.save().then(
        sts => res.status(201).json({ sts : 'success' })
    ).catch(
        err => {
            res.status(400).json({ sts : 'err', msg : err.message })
        }
    )
})

app.get('/', (req, res) => {
    Car.find({}, { __v : 0 } , (err, crs) => {
        if(err)  res.status(500).json()
        res.json(crs)
    } )
} )

app.put('/', (req, res) => {
    // homework : complete this code

    // fetch('http://google.com').then( res => res.json() ).then( dt => {
    //     // mongo queries
    // } )
} )

app.delete('/', (req, res) => {
     // homework : complete this code
} )




