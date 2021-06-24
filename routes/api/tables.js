const express = require('express');
const router = express.Router();

// @route           GET api/tables
// @description     Test route
// @acces           Public
router.get('/', (req, res) => res.send('Table route'));

module.exports = router;
