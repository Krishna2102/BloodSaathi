const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, // Specify 'type' to define the field type
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true

    },
    image: {
        type: String, // Optional field
        default: null // You can set a default if needed
    },
    password: {
        type: String, // Hashed password
        required: true
    },
    token: {
        type: String // Optional field
    },
    role: {
        type: String,
        default: 'User' // Set a default value
    },
    donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
    receivingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receiving' }]
});

// Corrected export statement
const User = mongoose.model('User', userSchema);
module.exports = User; // Use 'module.exports' instead of 'module.export'
