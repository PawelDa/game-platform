const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Route           GET auth
// Description     Test route
// Access          Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route           POST auth
// Description     Authenticate user and get JWT
// Access          Public
router.post(
    '/',
    body('email', 'Please provide a valid email address').isEmail(),
    body('password', 'Password is required').exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        if(!user) {
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Comparing given password with users password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // JsonWebToken
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          process.env.JWT,
          { expiresIn: 604800 }, // expires in 7 days
          (err, token) => {
            if(err) throw err;
            res.json({ token });
          }
        );
      } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

module.exports = router;
