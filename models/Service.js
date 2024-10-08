const mongoose = require('mongoose');

// Define the service schema
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{5}(?:[-\s]\d{4})?$/.test(v); // Example regex for US ZIP codes
            },
            message: props => `${props.value} is not a valid ZIP code!`
        }
    },
    serviceCategory: {
        type: String,
        required: true,
        enum: ['Category1', 'Category2', 'Category3'], // Define your service categories here
    },
    // documents: {
    //     type: [String], // Array of strings for file paths
    //     default: [],
    // },
    charges: {
        type: Number, // Changed to Number for numerical representation
        required: true
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Indexing for better performance
serviceSchema.index({ city: 1, state: 1 });
serviceSchema.index({ serviceCategory: 1 });

// Create and export the Service model
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
