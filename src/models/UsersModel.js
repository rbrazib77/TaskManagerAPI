const mongoose = require("mongoose");

let RegistrationSchema = mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


},{versionKey:false,timestamps:true});

let RegistrationModels = mongoose.model("User", RegistrationSchema);

module.exports = RegistrationModels;
