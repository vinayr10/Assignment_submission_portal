const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: {
        type: String,  // For username of the user submitting the assignment
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    adminId: {
        type: String,  // For username of the admin reviewing the assignment
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],  // Include 'pending'
        default: 'pending'  // Set default to 'pending'
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
