// backend/routes/auth.route.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields (name, email, and password)." });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Create a new user
        const user = new User({ name, email, password });

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: 'User successfully registered!' });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: 'Error registering user. Please try again later.' });
    }
});

export default router;
