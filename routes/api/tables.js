const express = require('express');
const router = express.Router();

const Table = require('../../models/Table');
// const User = require('../../models/User');

// @route           GET api/tables
// @description     Get all tables
// @aacces           Private
router.get('/', auth, async (req, res) =>{
  try {
    const tables = await Table.find().sort({ date: -1 });
    res.json(tables);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
