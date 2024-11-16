const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, phone, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            phone,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            id: savedUser._id,
            fullname: savedUser.fullname,
            email: savedUser.email,
            phone: savedUser.phone
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user.' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token with a more standard expiration time
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'default_secret', // Use a fallback for safety
            { expiresIn: '24h' } // 1 day expiration
        );

        res.status(200).json({
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                token,
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to log in.' });
    }
};


exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user details:', error);
        res.status(500).json({ message: 'Failed to retrieve user details.' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ fullname: 1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving user list:', error);
        res.status(500).json({ message: 'Failed to retrieve users.' });
    }
};


// Validation Middleware
exports.validateUserInput = [
    body('fullname').notEmpty().withMessage('Full Name is required.'),
    body('email').isEmail().withMessage('Invalid email format.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('phone').notEmpty().withMessage('Phone is required.'),
];

exports.validateLoginInput = [
    body('email').isEmail().withMessage('Invalid email format.'),
    body('password').notEmpty().withMessage('Password is required.'),
];