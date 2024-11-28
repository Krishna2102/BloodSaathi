const mongoose = require('mongoose');

const bloodCampSchema = new mongoose.Schema({
    campName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Regular expression to validate date format dd-mm-yyyy
                return /^\d{2}-\d{2}-\d{4}$/.test(value);
            },
            message: "Date must be in the format dd-mm-yyyy."
        }
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Regular expression to validate time format HH:MM
                return /^\d{2}:\d{2}$/.test(value);
            },
            message: "Time must be in the format HH:MM."
        }
    },
    location: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false, // Optional field
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital', // Reference to the Hospital model
        required: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('BloodCamp', bloodCampSchema);
