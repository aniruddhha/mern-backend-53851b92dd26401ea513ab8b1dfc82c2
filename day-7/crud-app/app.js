const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/test').then( () => {
    console.log('✅ Conncted Successfully')
} ).catch( err => {
    console.log('❌ There is a problem in connection')
})

const Car = mongoose.model('Car', {
    model : String,
    country : Number,
    isFwd : Boolean,
    make : String
}) 

const express = require('express')
const app = express()
app.listen(9000, () => console.log('✅ Car Server Started'))

app.post('/', express.json() ,(req, res) => {
    const reqCar = req.body // fetch the data from request
    console.log(reqCar)

    // const dbObj = new Car({ 
    //     model : reqCar.model, 
    //     make : reqCar.make,
    //     isFwd : reqCar.isFwd,
    //     country : reqCar.country
    // })

    //es6 version
    const dbObj = new Car({ ...reqCar })

    dbObj.save().then(
        sts => res.status(201).json({ sts : 'success' })
    ).catch(
        err => res.status(400).json({ sts : 'err' })
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
} )

app.delete('/', (req, res) => {
     // homework : complete this code
} )




