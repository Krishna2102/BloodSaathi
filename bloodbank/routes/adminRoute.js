// Import the middlewares

const adminOnly = require('../middlewear/adminMiddlewear');
//importing the required modules
const express = require('express');
const router = express.Router();
const { getAllPendingHospitals, getPendingHospitalsById,deleteHospital,deleteUser,getAllHospitals,getAllUsers,createUser,createHospital,updateHospital,updateUser} = require('../controller/Admin');
const authenticateAdmin = require('../middlewear/authMiddlewear');

// Apply the middlewares to the routes
router.get('/pending-requests', authenticateAdmin, adminOnly, getAllPendingHospitals);
router.put('/pending-requests/:id', authenticateAdmin, adminOnly, getPendingHospitalsById);
//delete hospital by id
router.delete('/hospital/:id', authenticateAdmin, adminOnly, deleteHospital);
//delete user by id
router.delete('/user/:id', authenticateAdmin, adminOnly, deleteUser);
//get all users
router.get('/user', authenticateAdmin, adminOnly, getAllUsers);
//get all hospitals
router.get('/hospital', authenticateAdmin, adminOnly, getAllHospitals);
//creating a new user
router.post('/user/create', authenticateAdmin, adminOnly, createUser);

//create a hospital
router.post('/hospital/create',authenticateAdmin,adminOnly,createHospital);

//updating the user
router.put('/user/update/:id', authenticateAdmin, adminOnly, updateUser);

//update hospitalDetails
router.put('/hospital/update',authenticateAdmin,adminOnly,updateHospital);
module.exports = router;
