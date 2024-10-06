const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
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

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists or create it dynamically
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  }
});

const upload = multer({ storage });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes);  // Use the service route

// Route for handling service form submissions with files
app.post("/api/service/submit", upload.array('documents'), async (req, res) => {
  const { name, degree, address, address2, city, state, zip, serviceCategory } = req.body;

  // Validate required fields
  if (!name || !degree || !address || !city || !zip) {
    return res.status(400).json({
      message: "Please fill all required fields: name, degree, address, city, and zip."
    });
  }

  // Get uploaded document paths (if any)
  const documents = req.files ? req.files.map(file => file.path) : [];

  try {
    // Create a new service submission
    const newService = new Service({
      name,
      degree,
      address,
      address2,
      city,
      state,
      zip,
      serviceCategory,
      documents,  // Save document paths to MongoDB
    });

    // Save the submission to the database
    await newService.save();

    res.status(201).json({ msg: 'Service submitted successfully', newService });
  } catch (err) {
    console.error('Error saving submission:', err);  // Log detailed error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
