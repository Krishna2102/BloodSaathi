//file for hospital controller
const express=require('express');
//using validator to validate email formats
const validator = require('validator');

const Hospital=require('../model/hospital');
const BloodRequest = require('../model/bloodRequest');
const Receiving = require('../model/receviing');
const User = require('../model/user');
const BloodStock=require('../model/bloodStock');
const BloodCamp=require('../model/bloodCamps');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator'); // For validation
//hospital registration
const hospitalRegister=async(req,res)=>{
    const { hospitalName, address, email } = req.body;
    
  
    try{
        //checking input values
        if(!(hospitalName && address&& email)){
            res.status(400).json({ error: "All inputs required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }
        //cheking if hospital already exists
        const hospital = await Hospital.findOne({email});
         
        if(hospital){
            return res.status(422).json({error:"Hospital already exists"});
        }
        //creating new hosptial
        const newhospital = new Hospital({
            hospitalName: hospitalName,
            address:address,
            email: email
        });
      
        //saving hospital
        const data=await newhospital.save();
        
        const hosptialResponse = {
            hospitalName: data.hospitalName,
            address: data.address,
            email: data.email
        };
      
        res.status(200).json(hosptialResponse);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }

}

// Confirm Blood Reception by the hospital and also decrement the blood stock
const confirmBloodReception = async (req, res) => {
    try{
        const { requestId } = req.body;
        const {decision}=req.body;
        const bloodRequest = await BloodRequest.findById(requestId);
        // console.log(bloodRequest);
        if (!bloodRequest) {
            return res.status(404).json({ error: "Blood request not found" });
        }
        if (bloodRequest.status === "Completed") {
            return res.status(400).json({ error: "Blood request already completed" });
        }
        if (decision === "Rejected") {
            bloodRequest.status = "Rejected";
            await bloodRequest.save();
            return res.status(200).json({ message: "Blood request rejected successfully" });
        }

        const { hospitalId, bloodGroup, quantity } = bloodRequest;
        // console.log(hospitalId, bloodGroup, quantity);
        const bloodStock = await BloodStock.findOne({ hospitalId, bloodGroup });
        console.log(bloodStock);
        // console.log(bloodStock);
        if (!bloodStock) {
            return res.status(404).json({ error: "Blood stock not found" });
        }
        if (bloodStock.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient blood stock" });
        }
        bloodStock.quantity -= quantity;
        console.log(bloodStock);
        await bloodStock.save();
        bloodRequest.status = "Completed";
        console.log(bloodRequest);
        await bloodRequest.save();
        const receiving = new Receiving({
            userId: bloodRequest.userId,
            hospitalId,
            bloodGroup,
            quantity
        });
        await receiving.save();
        res.status(200).json({ message: "Blood reception confirmed successfully" });

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

// Getting all pending blood requests
const getPendingBloodRequests = async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find({ status: "Pending" });
        res.status(200).json(bloodRequests);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Integrate functions for a cohesive workflow
const handleBloodReception = async (req, res) => {
    // Step 1: Retrieve all pending blood requests
  
    
    const pendingRequests = await BloodRequest.find({ status: "Pending" });

    if (pendingRequests.length === 0) {
        return res.status(404).json({ error: "No pending blood requests found" });
    }

    // Step 2: Confirm reception for a specific request
    const { requestId } = req.body; 
    // console.log(requestId);
    const {decision}=req.body;
    // console.log(decision);
    await confirmBloodReception({ body: { requestId,decision} }, res);
};



//getting hospital details
const getHospitalDetails=async(req,res)=>{
    try{
      
        // Assume `hospitalId` is extracted from the authentication token (JWT/session)
        const { user_id} = req.user; // Extracted from middleware
        
        const hospital = await Hospital.findById(user_id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        res.status(200).json({
            hospitalName: hospital.hospitalName,
            address: hospital.address,
            email: hospital.email,
            approvalStatus: hospital.approvalStatus,
            contactNumber: hospital.contactNumber,
    })
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}
const updateHospitalDetails = async (req, res) => {
    // Validate input data (you can add more validation as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { hospitalName, address, email, contactNumber } = req.body;
        const { user_id } = req.user;

        // Find the hospital by id
        const hospital = await Hospital.findById(user_id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        // Update hospital details if provided
        hospital.hospitalName = hospitalName || hospital.hospitalName;
        hospital.address = address || hospital.address;
        hospital.email = email || hospital.email;
        hospital.contactNumber = contactNumber || hospital.contactNumber;

        // Save updated hospital
        await hospital.save();

        res.status(200).json({ message: 'Hospital profile updated successfully', hospital });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//maintaining blood stock
const maintainBloodStock=async(req,res)=>{
    try{
        //assuming hospitalId is extracted from token
        const { user_id } = req.user;
        const { bloodGroup, quantity } = req.body;
        if (!bloodGroup || !quantity) {
            return res.status(400).json({ message: "All inputs required" });
        }
        console.log(bloodGroup, quantity, user_id);
        //checking if hospital exists
        const hospital = await Hospital.findById(user_id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        //checking if blood group exists
        const bloodStock = await BloodStock.findOne({ hospitalId: user_id, bloodGroup });
        if (bloodStock) {
            bloodStock.quantity += quantity;
            await bloodStock.save();
        } else {
            const newBloodStock = new BloodStock({
                hospitalId: user_id,
                bloodGroup,
                quantity
            });
            await newBloodStock.save();
        }
        res.status(200).json({ message: "Blood stock updated successfully" });

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

//see the current stock
const getBloodStock=async(req,res)=>{
    try{
        //assuming hospitalId is extracted from token
        const { user_id } = req.user;
        const bloodStock = await BloodStock.find({ hospitalId: user_id });
        res.status(200).json(bloodStock);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}


//blood camp registration
const bloodCampByHospital=async(req,res)=>{
    try{
        const { campName, date, time, location, notes } = req.body;
        const { user_id } = req.user;
        const hospital = await Hospital.findById(user_id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        const newBloodCamp = new BloodCamp({
            campName,
            date,
            time,
            location,
            notes,
            hospitalId: user_id
        });
        await newBloodCamp.save();
        res.status(200).json({ message: "Blood camp registered successfully" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getPendingBloodRequestsByHospital = async (req, res) => {
    // console.log("getPendingBloodRequestsByHospital");
    try {
        const { user_id } = req.user;

        // Validate user_id
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch pending blood requests for the logged-in hospital and populate the user details
        const bloodRequests = await BloodRequest.find({ hospitalId: user_id })
            .populate({ path: 'userId', select: 'name' }); // Populate with only the 'name' field of the user

        // Check if any requests were found
        
        if (bloodRequests.length === 0) {
            return res.status(404).json({ message: "No pending blood requests found for this hospital" });
        }

        // Respond with the found blood requests
        res.status(200).json(bloodRequests);
    } catch (err) {
        console.error("Error fetching pending blood requests:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports={
    hospitalRegister,
    confirmBloodReception,
    getPendingBloodRequests,
    handleBloodReception,
    getHospitalDetails,
    updateHospitalDetails,
    maintainBloodStock,
    getBloodStock,
    bloodCampByHospital,
    getPendingBloodRequestsByHospital
};