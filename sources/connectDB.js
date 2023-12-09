var mongoose = require('mongoose');

var URI = "mongodb://localhost:27017/db";

async function connectDB(){
   mongoose.connect(URI)
   .then((res) => console.log("connected to db"))
    .catch((err) => console.log(err));
    
}



module.exports = connectDB;