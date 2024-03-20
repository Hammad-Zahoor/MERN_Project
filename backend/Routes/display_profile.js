const express = require("express");
const router = express.Router();

router.post('/profile_data', (req, res) => {
    try {
        res.send([global.profile])
    } catch(error) {
console.log(error)
res.send("Server error")
    }
})

module.exports = router;