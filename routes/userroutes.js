const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path as needed
const Assignment = require('../models/assignment'); // Adjust path as needed

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered', user: newUser });
});

// Login user (no authentication)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }); // No hashing for simplicity
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
});

// Upload an assignment
router.post('/upload', async (req, res) => {
    const { userId, task, adminId } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username: userId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the admin exists (optional)
    let adminExists = true;
    if (adminId) {
        const admin = await User.findOne({ username: adminId });
        if (!admin) {
            adminExists = false;
        }
    }

    // Create the new assignment without using pending
    const newAssignment = new Assignment({
        userId: userId,
        task,
        adminId: adminExists ? adminId : null,
        status: 'pending' // Set status to 'accepted' or 'rejected'
    });

    await newAssignment.save();
    res.status(201).json({ message: 'Assignment uploaded', assignment: newAssignment });
});


// Fetch all admins (you can modify this to your needs)
router.get('/admins', async (req, res) => {
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
});

module.exports = router;
