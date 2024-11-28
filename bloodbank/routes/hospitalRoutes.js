//importing the model
const express=require('express');
const {hospitalRegister,getPendingBloodRequests,handleBloodReception,getHospitalDetails,updateHospitalDetails, getBloodStock,getPendingBloodRequestsByHospital, maintainBloodStock,bloodCampByHospital} = require('../controller/Hospital');
const authenticateHospital= require('../middlewear/authHospitalMiddlewear');
//creating router
const router=express.Router();

//hospital Registration
router.post('/register',hospitalRegister);

//getting info of hospital
router.get('/profile',authenticateHospital,getHospitalDetails);

//updating hospital details
router.put('/update',authenticateHospital,updateHospitalDetails);

//getting all pending request 
router.get('/pending',authenticateHospital,getPendingBloodRequests);
//get all pending request for one hospital
router.get('/pending-request',authenticateHospital,getPendingBloodRequestsByHospital);

router.post('/reception',authenticateHospital,handleBloodReception);

//maintaining the blood stock
router.post('/stock/maintain',authenticateHospital,maintainBloodStock);
//getting all stock
router.get('/stock/all',authenticateHospital,getBloodStock);
//registering blood camp
router.post('/bloodcamp',authenticateHospital,bloodCampByHospital);


module.exports=router;