// lib/mongoose.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance'; // Update to your MongoDB URI

let isConnected = false;

export default async function connectDB() {
  if (isConnected) {
    // If already connected, skip the connection attempt
    return mongoose.connection;
  }

  try {
    // Connect to the database
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, // Optional, check Mongoose documentation if required
      useUnifiedTopology: true, // Optional, check Mongoose documentation if required
    });

    // Set the flag to true once connected
    isConnected = true;
    console.log('Database connected successfully');
    return mongoose.connection;
  } catch (err) {
    // Handle connection errors
    console.error('Database connection failed:', err);
    throw new Error('Database connection failed');
  }
}
