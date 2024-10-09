// config.js
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = 'mongodb://localhost:27017/Assignment_Submision'; // Replace with your actual database name

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
