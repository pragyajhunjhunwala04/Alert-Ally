//receives last location of the user to the server/emergency contact

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (or your preferred database)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Create User Location schema
const locationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  locations: [{
    lat: Number,
    lng: Number,
    timestamp: Date,
    accuracy: Number
  }]
});

const UserLocation = mongoose.model('UserLocation', locationSchema);

// API Endpoint to save location
app.post('/api/save-location', async (req, res) => {
  try {
    const { userId, location } = req.body;
    
    if (!userId || !location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return res.status(400).json({ error: 'Invalid location data' });
    }
    
    // Find user's document or create if doesn't exist
    const userLocationDoc = await UserLocation.findOneAndUpdate(
      { userId: userId },
      { 
        $push: { 
          locations: {
            lat: location.lat,
            lng: location.lng,
            timestamp: new Date(location.timestamp || Date.now()),
            accuracy: location.accuracy || null
          } 
        } 
      },
      { upsert: true, new: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Location saved successfully',
      totalLocations: userLocationDoc.locations.length
    });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API Endpoint to get user's last location
app.get('/api/get-last-location/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user's document
    const userLocationDoc = await UserLocation.findOne({ userId: userId });
    
    if (!userLocationDoc || userLocationDoc.locations.length === 0) {
      return res.status(404).json({ error: 'No location data found for this user' });
    }
    
    // Get the most recent location (last element in the array)
    const lastLocation = userLocationDoc.locations[userLocationDoc.locations.length - 1];
    
    res.status(200).json({
      success: true,
      location: {
        lat: lastLocation.lat,
        lng: lastLocation.lng,
        timestamp: lastLocation.timestamp,
        accuracy: lastLocation.accuracy
      }
    });
  } catch (error) {
    console.error('Error retrieving location:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});