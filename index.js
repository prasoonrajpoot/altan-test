var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var connectDB = require("./sources/connectDB");
var createFile = require("./sources/create");
var addFile = require("./sources/add");
var friendsFile = require("./sources/friends");
var app = express();
connectDB();


app.use(bodyParser.urlencoded({extended :true}));

app.get("/", function(req, res){
    res.status(200).send("hello");
})


app.use("/create", createFile);
app.use("/add", addFile);
app.use("/friends", friendsFile);



app.listen(3000, () => {
    console.log("backend running at port " + 3000);
})