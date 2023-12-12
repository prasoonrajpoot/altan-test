var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Users = require("../models/users");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/:userA/:userB", async function(req, res){

    var a = req.params.userA;
    var b = req.params.userB;
    a = a.substring(1);
    b  = b.substring(1);
    console.log(a, b);

    //check if both of them exits
    var userA = await Users.findOne({userName : a});
    var userB = await Users.findOne({userName : b});
    console.log(userA, userB);
    if(userA == null || userB == null){
        res.status(400).send({
            "status" : "failure",
            "reason" : "explanation",
        })
        return;
    }

    var arrayA = userA.requests;
    var arrayB = userB.requests;

    for(var i = 0; i < arrayA.length; i++){
        if(arrayA[i] == b){
            userA.friends.push(b);
            userB.friends.push(a);
            await userA.save();
            await userB.save();
            res.status(200).send({
                "status" : "success",
            })
            return;

        }
    }

    for(var i = 0; i < arrayB.length; i++){
        if(arrayB[i] == a){
            res.status(400).send({
                "status" : "failure",
                "reason" : "explanation",
            })
        }
    }

    arrayB.push(a);
    userB.requests = arrayB;
    await userB.save();  
    res.status(202).send({
        status : "success",
    })  


    

    


})

module.exports = app