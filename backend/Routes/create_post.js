const express = require("express");
const router = express.Router();
const profile = require("../models/profile");
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const jwt_secret = "sihdsdifwdjhdiwjcdicj";

router.post("/create_post", async (req, res) => {
    try {

        const decoded = jwt.verify(req.body.userID, jwt_secret);
        // Create a new post based on the request body
        const newPost = await profile.create({
            caption: req.body.caption,
            image: req.body.image,
            likes: req.body.likes,
            comments: req.body.comments,
            userID : decoded.user.id,
        });

        //console.log(newPost);

        // Respond with success and the ID of the new post
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        // Handle specific Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
            return res.status(400).json({ success: false, error: errorMessage });
        }
        // Handle other errors
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.post('/search_user', async (req, res) => {
    try {
        const { search } = req.body; // Assuming search is sent in the request body
        //console.log(search)

        // Search for users whose name matches or partially matches the search term
        const users = await User.find({ name: { $regex: search, $options: 'i' } });

        if (users.length > 0) {
            global.matchedUsers = users;

            //console.log(global.matchedUsers)
            res.status(200).json({ message: "successful" });
        } else {
            // If no matching users found, send an empty response or an appropriate message
            res.status(404).json({ message: 'No matching users found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    //console.log(token)
    //console.log("Hello")

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    jwt.verify(token, jwt_secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = decodedToken.user;
        //console.log(req.user)
        next();
    });
};

router.get('/get_profile_post',verifyToken, async (req, res) => {
    const userID = req.user.id;
    try {
        const data = await profile.find({userID}); 
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.get('/get_post', async (req, res) => {
    try {
        const data = await profile.find(); 
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.get('/get_search', async (req, res) => {
    try {
        const data = global.matchedUsers;
        if (!data || data.length === 0) {
            throw new Error('No matching users found.');
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data', message: error.message });
    }
});

module.exports = router;
