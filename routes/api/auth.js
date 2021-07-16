const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route           GET api/auth
// @description     Test route
// @acces           Public
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route           POST api/auth
// @description     Authenticate user & and get JsonWebToken
// @acces           Public
router.post(
    '/',
    // email validation
    body('email', 'Please provide a valid email address').isEmail(),
    // password validation
    body('password', 'Password is required').exists(),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        //if User deosnt exists
        if(!user) {
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Comparing given password to user password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Json web token
        const payload = {
          user: {
            id: user.id
          }
        }
  
        jwt.sign(
          payload,
          config.get('jwtToken'),
          { expiresIn: 8640 }, // expires in 24h
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
