const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path for file handling
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth.js');
const serviceRoutes = require('./routes/service.js');  // Import the service route
const Service = require('./models/Service'); // Ensure you import your Service model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes);  // Use the service route

// Route for handling service form submissions with files
app.post("/api/service/submit", async (req, res) => {
    console.log('Request Body:', req.body); // Log the complete request body
    console.log('Uploaded Files:', req.files); // Log uploaded files
  
    const { name, degree, address, city, state, zip, serviceCategory} = req.body;
    console.log({ name, degree, address, city, state, zip, serviceCategory });
  
    // Validate required fields
    if (!name || !degree || !age || !address || !city || !zip) {
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
      });
  
      await newService.save();
  
      res.status(201).json({ msg: 'Service submitted successfully', newService });
    } catch (err) {
      console.error('Error saving submission:', err.message);  // Detailed error logging
      res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  });
  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
