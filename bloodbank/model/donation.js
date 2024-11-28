const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    date: { type: Date, default: Date.now },
    bloodGroup: String,
    amount: Number, 
});

const Donation = mongoose.model('Donation', donationSchema);