// 👇 import the connector
const mongoose = require('mongoose'); 

`
👇 try to get connected with the mongo 
(community) server running on 
 - port : 27017
 - host : localhost
 - db : tes
`
mongoose.connect('mongodb://localhost:27017/test'); // create single connection
mongoose.set('debug', true);

`
👇
Mongoose is ODM
Js object is mapped with mongodb data model
`
const Cat = mongoose.model('Cat', { 
    name: String, 
    isBig : Boolean 
});

`👇 actual data`
const kitty = new Cat({ "name": 'Zildjian', isBig : false });

`👇 mongoose will convert save call to the db insert query`
// kitty.save()
//     .then( () =>  console.log('✅ Cat Saved') )
//     .catch( err => console.log('❌ There is error') )
//     // .finally(() => mongoose.disconnect() ) // you need to disconnect only once

// Cat.find((err, cats) => {
//     if(err) return
//     console.log(cats)
// })

Cat.find({ 'isBig' : false }, {  isBig : 0, __v:0 } ,(err, cats) => console.log(cats) ).limit(2)

