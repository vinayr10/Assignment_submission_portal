// routes/adminRoutes.js
const express = require('express');
const Assignment = require('../models/assignment');

const router = express.Router();

// View assignments
router.get('/assignments', async (req, res) => {
    const assignments = await Assignment.find({});
    res.json(assignments);
});

// Accept an assignment
router.post('/assignments/:id/accept', async (req, res) => {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment accepted', assignment });
});

// Reject an assignment
router.post('/assignments/:id/reject', async (req, res) => {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment rejected', assignment });
});

module.exports = router;
