var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Users = require("../models/users");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async function(req, res){
    var data = req.body;
    console.log(data);
    var b = await Users.find({userName : data.username});
    console.log(b);
    if(b.length == 0){
        var user = new Users({
            userName : data.username,
            friends : [],
            requests : [],
        });
        await user.save();
        res.status(201).send({"username": ""});
    }else{
        console.log("did not save");
        res.status(400).send({
           "status" : "failure",
           "reason" : "explanation",
        })
    }
})

module.exports = app