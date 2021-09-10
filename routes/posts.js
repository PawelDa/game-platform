const express = require('express');
const router = express.Router();

// @route           GET posts
// @description     Test route
// @acces           Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
