const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route           GET api/auth
// @description     Test route
// @acces           Public
router.get('/', auth, (req, res, next) => res.send('Auth route'));

module.exports = router;
