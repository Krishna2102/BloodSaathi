//it is an authentication controller
const express=require('express');
//validator to validate email format
const validator=require('validator');
//importing hasing and salting libraries for hashing the password
const bcrypt=require('bcryptjs');
//importing jwt token library for tokenization
const jwt=require('jsonwebtoken');
//importing models
const User=require('../model/user');
const Hospital=require('../model/hospital');
const Admin=require('../model/admin');
//importing blood request model
const BloodRequest=require('../model/bloodRequest');
const Receiving=require('../model/receviing');
const mongoose = require('mongoose');
//importing local storage
const localStorage=require('localStorage');
//to do for this controller
//1.registration
//2.login
//==============user Registration=====================//

const userRegistration = async (req, res) => {
    const { name, address, country, state, district, pincode, phoneNumber, email, password,dob,gender,bloodGroup} = req.body;
    console.log(req.body);

    try {
        // Checking if all required fields are given
        if (!(name && address &&dob && bloodGroup && gender&& country && state && district && pincode && phoneNumber && email && password)) {
            return res.status(400).json({ error: "All inputs required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Checking if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ error: "User already exists" });
        }

        // Hash the password
        const hashPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        };

        // Creating a new user
        const newUser = new User({
            name,
            address,
            country,
            state,
            district,
            pincode,
            phoneNumber,
            email,
            dob,
            bloodGroup,
            gender,
            password: await hashPassword(password)
        });

        // Saving newUser into the database
        const newUserCreated = await newUser.save();
        console.log(newUserCreated);
        // Generate token
        const expiresInDays = 30 * 24;
        const token = jwt.sign({ user_id: newUserCreated._id, email }, process.env.TOKEN_KEY, { expiresIn: `${expiresInDays}h` });
        newUserCreated.token = token;

        // Prepare response excluding password
        const userResponse = {
            name: newUserCreated.name,
            address: newUserCreated.address,
            country: newUserCreated.country,
            state: newUserCreated.state,
            district: newUserCreated.district,
            pincode: newUserCreated.pincode,
            phoneNumber: newUserCreated.phoneNumber,
            email: newUserCreated.email,
            dob: newUserCreated.dob,
            bloodGroup: newUserCreated.bloodGroup,
            gender: newUser.gender,
            token: newUserCreated.token,
        };

        res.status(200).json(userResponse);
    } catch (err) {
        console.error("Registration Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
const globalLogin = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validate user input
        if (!(email && password && role)) {
            return res.status(400).json({ error: "All input is required" });
        }

        let user;
        // console.log(role);
        // Check based on role
        if (role === "User") {
            user = await User.findOne({ email });
        } else if (role === "Hospital") {
            user = await Hospital.findOne({ email });
        } else if (role === "Admin") {
            user = await Admin.findOne({ email });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        // Check for user credentials
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // Create token
            const token = jwt.sign({ user_id: user._id, email, role }, process.env.TOKEN_KEY, { expiresIn: "5h" });
            user.token = token;
            console.log(user.token);
            // setting role in local storage
            // localStorage.setItem('role', role);
            
            // Respond with user
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


//logout function
const userLogout = async (req, res) => {
    const { email, role } = req.body;
    try{
        let user;
        if(role==="User"){
            user=await User.findOne({email});
        }
        else if(role==="Hospital"){
            user=await Hospital.findOne({ email });
        }
        else if(role==="Admin"){
            user=await Admin.findOne({ email});
        }
        else{
            return res.status(400).json({error:"Invalid role"});
        }
        if(user){
            user.token="";
            //also making local storage part null
           
            await user.save();
            return res.status(200).json({message:"Logged out successfully"});
        }
        else{
            return res.status(400).json({error:"Invalid credentials"});
        }
        }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}

//change password function
const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword, role } = req.body;
    try {
        let user;
        if (role === "User") {
            user = await User.findOne
            ({ email });
        } else if (role === "Hospital") {
            user = await Hospital.findOne
            ({ email });
        } else if (role === "Admin") {
            user = await Admin.findOne
            ({ email });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }
        if (user) {
            const validPassword = await bcrypt.compare(oldPassword, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
            const hashPassword = async (password) => {
                const salt = await bcrypt.genSalt(10);
                return await bcrypt.hash(password, salt);
            }
            user.password = await hashPassword(newPassword);
            await user.save();
            return res.status(200).json({ message: "Password changed successfully" });
        } else {
            return res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}


//get user profile
const getUserProfile = async (req, res) => {
    try {
        // Extract the user ID from the decoded token
        const userId = req.user.user_id; // Assuming req.user is populated by your authentication middleware
        console.log(userId);

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with user details
        res.status(200).json({
            name: user.name,
            
            
            phoneNumber: user.phoneNumber,
            email: user.email,
            
           
            bloodGroup: user.bloodGroup,
           
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


//update user profile
const { body, validationResult } = require('express-validator'); // For validation

const updateUserProfile = async (req, res) => {
    const userId = req.user.user_id; // Extract user ID from the authenticated user
    console.log(userId);
    
    // Validate input data (you can add more validation as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name,phoneNumber, email} = req.body;
    
    try {
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.email = email || user.email;
        

        await user.save(); // Save the updated user
        
        console.log("profile updated")
        res.status(200).json({ message: 'User profile updated successfully' });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Request Blood Endpoint
const requestBlood = async (req, res) => {
    const { hospitalId, bloodType, quantity, reason } = req.body;
    // console.log(req.user)
    const userId = req.user.user_id; // Assuming user ID is available in the request object after authentication
    // console.log(userId);   
    // console.log(req.body);
    // console.log(hospitalId);
    try {
        const user = await User.findById(userId);
        const hospital = await Hospital.findById(hospitalId);

        if (!user || !hospital) {
            return res.status(404).json({ error: "User or Hospital not found" });
        }

        // Create the blood request (assuming a BloodRequest model)
        const newRequest = new BloodRequest({
            userId: user._id,
            hospitalId: hospital._id,
            bloodGroup: bloodType, // Update this to match the frontend request
            quantity,
            reason, // Capture the reason for the blood request
            status: "Pending" // Request starts as pending
        });

        await newRequest.save();

        res.status(201).json({ message: "Blood request submitted", request: newRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Receiving History for User
const getReceivingHistory = async (req, res) => {
    const { user_id } = req.user; // Assuming user is authenticated and user_id is available

    try {
        // Find all receiving history records for the given userId
        const receivingHistory = await Receiving.find({ userId: user_id })
            .populate('hospitalId', 'hospitalName address') // Populate hospital details as needed
            .sort({ date: -1 }); // Optional: sorts history by date in descending order

        // Check if there’s any receiving history
        if (!receivingHistory.length) {
            return res.status(404).json({ error: "No receiving history found for this user" });
        }

        res.status(200).json({ receivingHistory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch Hospitals Endpoint
const hospitalList = async (req, res) => {
    try {
        const hospitals = await Hospital.find({}, 'hospitalName address');
        res.status(200).json({ hospitals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Validate inputs in the route definition
const updateUserValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('phoneNumber').isLength({ min: 10, max: 15 }).withMessage('Invalid phone number'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
];


module.exports={userRegistration,
    globalLogin,
    userLogout,
    getUserProfile,
    updateUserProfile,
    updateUserValidationRules,
    requestBlood,
    getReceivingHistory,
    hospitalList,
    changePassword};
