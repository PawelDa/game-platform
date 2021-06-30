const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route           POST api/users
// @description     Register user
// @acces           Public
router.post(
  '/',
  // user validation
  body('name', 'Name is required').not().notEmpty(),
  // email validation
  body('email', 'Please provide a valid email address').isEmail(),
  // password validation
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    


    res.send('User route');
  }
);

module.exports = router;
