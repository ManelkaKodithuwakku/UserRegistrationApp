const router = require('express').Router();
const { User, authMiddleware } = require('../models/user');
const { validateSignup, validateLogin } = require('../services/user-service');
const bcrypt = require('bcrypt');

// Route to handle user signup
router.post('/api/user/signup', async (req, res) => {
    try {
        // Validate the request body for signup
        const { error } = validateSignup(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if user with the given email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(406).send({ message: "User already exists with the given email." });

        // Generate hash for the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Update the password with the hashed password
        req.body.password = hashPassword;

        // Save the new user to the database
        await new User(req.body).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error occurred while signing up the user" });
    }
});

// Route to handle user login
router.post('/api/user/login', async (req, res) => {
    try {
        // Validate the request body for login
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Find the user based on the provided email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(406).send({ message: "User not registered yet. Please signup first and then login" });

        // Check if the provided password is valid
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Username or Password" });

        // Generate an authentication token for the user
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error occurred while logging in the user" });
    }
});

// Route to get user details (requires authentication middleware)
router.get('/api/user/details', authMiddleware, (req, res) => {
    // The user details are available in req.user
    const userDetails = {
        username: req.user.username,
        email: req.user.email,
    };

    res.json(userDetails);
});

// Export the router
module.exports = router;
