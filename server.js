const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs'); // Import fs for file system operations
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth.js');
const serviceRoutes = require('./routes/service.js'); 
const Service = require('./models/Service');

// Ensure uploads folder exists (if you're still using it)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
}

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/uploads', express.static(uploadsDir)); // Serve uploaded files

// MongoDB connection
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not defined in environment variables');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes); 

// Route for handling service form submissions without files
app.post("/api/service/submit", async (req, res) => {
    const { name, degree, address, city, state, zip, serviceCategory, charges } = req.body;

    // Validate required fields
    if (!name || !degree || !address || !city || !zip) {
        return res.status(400).json({
            message: "Please fill all required fields: name, degree, address, city, and zip."
        });
    }

    try {
        const newService = new Service({
            name,
            degree,
            address,
            city,
            state,
            zip,
            serviceCategory,
            charges
        });

        await newService.save();

        res.status(201).json({ msg: 'Service submitted successfully', newService });
    } catch (err) {
        console.error('Error saving submission:', err); 
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
