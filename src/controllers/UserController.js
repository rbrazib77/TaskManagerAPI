const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../Models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");

// Registration
exports.registration = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await UsersModel.create(reqBody);
    res.status(201).json({ status: "Success", data: result });
  } catch (e) {
    res.status(400).json({ status: "Fail", data: e.toString });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await UsersModel.find(reqBody).count();
    //Login Success
    if (result == 1) {
        let payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: reqBody["email"],
          };
        let Token = jwt.sign(payload, 'SecretKey123456');
        res.status(201).json({ status: "Success", data:Token });
    } else {
      res.status(404).json({ status: "Success", data: "No User Found" });
    }
  } catch (e) {
    res.status(400).json({ status: "Fail", data: e.toString });
  }
};

// ProfileDetails
exports.profileDetails=async(req,res)=>{
    try{
        let email=req.headers["email"]
        let result=await UsersModel.find({email:email})
        res.status(201).json({ status: "Success", data:result });
    }catch(e){
        res.status(400).json({ status: "Fail", data: e.toString });
    }
}

// ProfileUpdate
exports.profileUpdate=async(req,res)=>{
   try{
    let email=req.headers["email"]
    let reqBody=req.body
    let result=await UsersModel.updateOne({email:email},reqBody)
    res.status(201).json({ status: "Success", data:result });
   }catch(e){
    res.status(400).json({ status: "Fail", data: e.toString });
   }
}

// recoververifyemail
exports.recoverVerifyEmail=async(req,res)=>{
    let email=req.params.email
    let OTPCode=Math.floor(100000+Math.random()*900000)
    let EmailSubject="Task manager Verification code"
    let EmailText="Your Verification Code"+OTPCode
    let result = await UsersModel.find({email:email}).count();
    if(result==1){
        // Verification Email
        await SendEmailUtility(email,EmailText,EmailSubject)
        await OTPModel.create({email:email,otp:OTPCode})
        res.status(201).json({ status: "Success", data:"6 Degit Verification Code has been Send" });
    }else{
        res.status(404).json({ status: "Success", data: "No User Found" });
    }

}

exports.recoverVerifyOTP=async(req,res)=>{
    let email=req.params.email;
    let OTPCode=req.params.otp;
    let status=0
    let statusUpdate=1
    let result = await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    if(result==1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status},{status:statusUpdate})
        res.status(201).json({ status: "Success", data:"Verification Completed" });
    }else{
        res.status(404).json({ status: "Success", data: "Invalid Verification Code" });
    }
}
exports.recoverResetPass=async(req,res)=>{
    let email=req.body["email"];
    let OTPCode=req.body["otp"];
    let NewPassword=req.body["password"];
    let statusUpdate=1
    let result = await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result==1){
        await UsersModel.updateOne({email:email},{password:NewPassword})
        res.status(201).json({ status: "Success", data:"Password Reset Success" });
    }else{
        res.status(404).json({ status: "Success", data: "Invalid Verification Code" });
    }
}
