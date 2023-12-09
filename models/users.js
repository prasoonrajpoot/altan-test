var mongoose = require("mongoose");

const UserScheema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique: true,
    },
    friends: {
        type : [String],
    },
    requests: {
        type :[String],
    }
});


const Users = mongoose.model("User", UserScheema);

module.exports = Users;