var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Users = require("../models/users");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async function(req, res){
    console.log("user")
    var data = req.body;
    console.log(data);
    var b = await Users.find({userName : data.username});
    console.log(b);
    if(b.length == 0){
      res.status(400).send({
           "status" : "failure",
           "reason" : "explanation",
        })
    }else{
        console.log("sending ");
        console.log(b[0].friends);
        if(b[0].friends.length == 0){
          res.status(404).send({
            "status" : "failure",
            "reason" : "explanation",
          })
        }
        res.status(202).send({"friends": b[0].friends});
    }


})

module.exports = app