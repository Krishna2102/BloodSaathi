const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    bloodGroup: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ["Pending","Rejected", "Completed"], default: "Pending" }
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);
module.exports = BloodRequest;
