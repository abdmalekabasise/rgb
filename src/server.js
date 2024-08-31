require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Log MONGO_URI to ensure it's being read correctly
console.log('MONGO_URI:', process.env.MONGO_URI);

// Import and use routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.status(200).send('Hello from the backend!');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
        // Start the server after successful database connection
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Handle 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'An internal server error occurred' });
});
