require('dotenv').config(); // Load environment variables first

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index')
const MONGODB_URI = process.env.MONGODB_URI; // Retrieve MongoDB URI from env
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

const app = express(); // Create an Express application

// Middleware
app.use(express.json()); // Body parser middleware to handle JSON requests
app.use(cors({
    origin: ['http://localhost:8081', 'https://uftedu.onrender.com'],
    credentials: true,
  }));
  


// Default route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', router)

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server once connected to MongoDB
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for development
    res.status(500).json({ message: err.message }); // Send JSON error response
});