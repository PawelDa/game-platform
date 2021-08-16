const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route           GET api/profile/me
// @description     Get current users profile
// @acces           Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'users',
      ['name', 'avatar']
    );

    if(!profile) {
      res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route           POST api/profile
// @description     Create or update profile
// @acces           Private
router.post('/', auth, async (req, res) => {
  const { bio } = req.body;

  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // Update profile
    if(profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create profile
    profile = new Profile(profileFields);
    await profile.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route           GET api/profile
// @description     Get all profiles
// @acces           Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route           GET api/profile/:user_id
// @description     Get profile by user_id
// @acces           Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route           DELETE api/profile
// @description     Delete profile and user
// @acces           Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
