const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Define API endpoints for CRUD operations

router.get('/users/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Define other CRUD endpoints (POST, PUT, DELETE) as needed

router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;