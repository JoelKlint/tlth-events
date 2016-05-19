// Connect to Server Database
import mongoose from 'mongoose';
mongoose.connect('mongodb://firefox:firefox@ds013260.mlab.com:13260/tlth-events-server');

// Import server to start it
import './server';
