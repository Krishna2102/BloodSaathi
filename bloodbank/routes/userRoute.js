const express=require('express');
const router=express.Router();
const {userRegistration, globalLogin,userLogout,getUserProfile,updateUserProfile,updateUserValidationRules,hospitalList,requestBlood,getReceivingHistory,changePassword} =require('../controller/Auth');
const authenticateUser = require('../middlewear/userMiddlewear');

//user registration route
router.post('/register',userRegistration);
//user login
router.post('/login',globalLogin);

//change password
router.post('/change-password',authenticateUser,changePassword);

//logout
router.post('/logout',userLogout);

//user profile
router.get('/profile',authenticateUser,getUserProfile);
//update user profile
router.put('/update',authenticateUser,updateUserValidationRules,updateUserProfile);

//requesting for blood
router.post('/request-blood',authenticateUser,requestBlood);
//fetch hospitals
router.get('/fetch-hospitals',authenticateUser,hospitalList);
//confirming blood reception

router.get('/receiving-history',authenticateUser,getReceivingHistory);

module.exports=router;
