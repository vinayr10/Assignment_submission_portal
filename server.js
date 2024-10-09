// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const adminRoutes = require('./routes/adminroutes');
const userRoutes = require('./routes/userroutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
