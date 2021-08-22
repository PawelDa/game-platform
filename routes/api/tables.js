const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Table = require('../../models/Table');
const User = require('../../models/User');
const Profile = require('..//../models/Profile');

// @route           POST api/tables
// @description     Create a table
// @aacces          Private
router.post('/', auth, async (req, res) => {
  //console.log('Hello');
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newTable = new Table({user: req.user.id});

    const table = await newTable.save();

    res.json(table);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route           GET api/tables
// @description     Get all tables
// @aacces          Private
router.get('/', auth, async (req, res) => {
  try {
    const tables = await Table.find().sort({ date: -1 });
    res.json(tables);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
