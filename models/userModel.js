const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email : {type: String, required : true},
    password : {type : String, required : true},
    phone : {type : String},
    code : {type : String},
    role : {type : String, required: true},
    verified : {type: Boolean, required: true}
})

const userModel = mongoose.model('users' , userSchema)

module.exports = userModel