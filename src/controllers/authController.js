const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Register function with added logging
const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log('Received registration data:', req.body);

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ error: 'User with this email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user with hashed password
        const user = await User.create({ fullName, email, password: hashedPassword });
        console.log('User created successfully:', user);

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
        console.log('JWT token generated:', token);

        // Respond with the user and token
        res.status(201).json({ user: { id: user._id, fullName: user.fullName, email: user.email }, token });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login function with added logging
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received:', { email });

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('No user found with this email:', email);
            return res.status(200).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            console.log('Password does not match for user:', email);
            return res.status(200).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
        console.log('User authenticated successfully:', email);

        // Respond with the user details and token
        res.status(200).json({ user: { id: user._id, fullName: user.fullName, email: user.email }, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log('Forgot password request received:', { email });

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('No user found with this email:', email);
            return res.status(200).json({ error: 'User not found' });
        }

        // Generate a random password
        const newPassword = crypto.randomBytes(8).toString('hex');

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        // Update user's password
        user.password = hashedPassword;
        await user.save();
        console.log('New password set for user:', email);

        // Send the new password via email


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('New password sent to user:', email);

        // Respond with success message
        res.status(200).json({ message: 'A new password has been sent to your email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};
module.exports = { register, login, forgotPassword };