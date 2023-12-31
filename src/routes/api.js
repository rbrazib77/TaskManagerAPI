const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware")

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);

router.get("/profiledetails",AuthVerifyMiddleware,UserController.profileDetails);
router.post("/profileupdate",AuthVerifyMiddleware,UserController.profileUpdate);

router.get("/recoververifyemail/:email",UserController.recoverVerifyEmail);
router.get("/recoververifyotp/:email/:otp",UserController.recoverVerifyOTP);
router.post("/recoverresetpass/",UserController.recoverResetPass);


module.exports = router;