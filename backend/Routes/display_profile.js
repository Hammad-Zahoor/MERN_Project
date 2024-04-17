const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const jwt_secret = "sihdsdifwdjhdiwjcdicj"
const User = require("../models/User");

// router.post('/profile_data', (req, res) => {
//     try {
//         res.send([global.profile])
//     } catch(error) {
// console.log(error)
// res.send("Server error")
//     }
// })

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

router.post('/profile_data',verifyToken, async (req, res) => {
    const userID = req.user.id;
    const data = await User.findOne({ _id: userID });
    //console.log(data);
    try {
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.post('/profile_data/:profile_id', async (req, res) => {
    const userID = req.params.profile_id;
    //console.log(userID);
    const data = await User.findOne({ _id: userID });
    //console.log(data);
    try {
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;