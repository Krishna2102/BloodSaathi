const mongoose = require('mongoose');
const { resolveContent } = require('nodemailer/lib/shared');

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    approvalStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",

    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    contactNumber: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    token:{
        type:String,
        required:false
    },
    role:{ 
        type:String,
        default:"Hospital"
    }
});

// Create the Hospital model
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
