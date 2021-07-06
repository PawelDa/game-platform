const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route           GET api/auth
// @description     Test route
// @acces           Public
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User
  } catch(err) {

  }
});

module.exports = router;
