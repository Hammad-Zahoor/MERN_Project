const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_secret = "sihdsdifwdjhdiwjcdicj"

router.post("/create_user",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array()); // Log validation errors for debugging
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(12);
        let sec_password = await bcrypt.hash(req.body.password,salt)

        try {
            // Create a new user based on the request body
            const newUser = await User.create({
                name: req.body.name,
                education: req.body.education,
                email: req.body.email,
                password: sec_password,
                major: req.body.major,
                role: req.body.role,
                image: req.body.image
            });

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    });

router.post("/signin_user",
    body('email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array()); // Log validation errors for debugging
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: "Try logging with  correct credential" })
            }

            const pwd = await bcrypt.compare(req.body.password,user.password)
            if (!pwd) {
                return res.status(400).json({ errors: "Try logging with  correct credentials" })
            }

            const data = {
              user:{
                id:user.id
              }
            }

            const authtoken = jwt.sign(data,jwt_secret)
            res.json({ success: true ,authToken: authtoken});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    });



module.exports = router;
