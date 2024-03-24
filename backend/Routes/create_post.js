const express = require("express");
const router = express.Router();
const profile = require("../models/profile");

router.post("/create_post", async (req, res) => {
    try {
        // Create a new post based on the request body
        const newPost = await profile.create({
            caption: req.body.caption,
            image: req.body.image
        });

        // Log the request body for debugging
        console.log(req.body);

        // Respond with success and the ID of the new post
        res.json({ success: true, postId: newPost._id });
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

module.exports = router;
