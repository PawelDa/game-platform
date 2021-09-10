const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

// Route           POST users
// Description     Register user
// Access          Public
router.post(
  '/',
  body('name', 'Name is required').not().notEmpty(),
  body('email', 'Please provide a valid email address').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if(user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
      }

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      user = new User({ name, email, avatar, password });

      // Encypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Saving User
      await user.save();

      // Json Web Token
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
