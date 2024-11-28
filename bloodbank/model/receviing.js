const mongoose = require('mongoose');

const receivingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    bloodGroup: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Receiving = mongoose.model('Receiving', receivingSchema);
module.exports = Receiving;
