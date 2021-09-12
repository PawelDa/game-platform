const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const axios = require('axios');

const Profile = require('../models/Profile');
const User = require('../models/User');

// Route           GET profile/me
// Description     Get current user profile
// Access          Private
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

// Route           POST profile
// Description     Create or update user profile
// Access          Private
router.post('/',
  auth,
  body('status', 'Status is required').not().notEmpty(),
  body('skills', 'Skills is required').not().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // Spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // Profile object
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // Normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // Add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// Route           GET profile
// Description     Get all profiles
// Access          Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('users', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route           GET profile/user/:user_id
// Description     Get profile by user ID
// Access          Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('users', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Route           DELETE profile
// Description     DELETE profile, user and posts
// Access          Private
router.delete('/', auth, async (req, res) => {
  try {
    await Promise.all([
      // Remove user
      User.findOneAndRemove({ _id: req.user.id }),
      // Remove profile
      Profile.findOneAndRemove({ user: req.user.id })
      // TODO remove user posts
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route           PUT profile/experience
// Description     Add profile experience
// Access          Private
router.put(
  '/experience',
  auth,
  body('title', 'Title is required').not().notEmpty(),
  body('company', 'Company is required').not().notEmpty(),
  body('from', 'From date is required').not().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route           DELETE profile/experience/:exp_id
// Description     DELETE experience from profile
// Access          Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const experienceIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(experienceIndex, 1);

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Route           PUT profile/education
// Description     Add profile education
// Access          Private
router.put(
  '/education',
  auth,
  body('school', 'School is required').not().notEmpty(),
  body('degree', 'Degree is required').not().notEmpty(),
  body('fieldofstudy', 'Field of study is required').not().notEmpty(),
  body('from', 'From date is required').not().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route           DELETE profile/education/:exp_id
// Description     DELETE education from profile
// Access          Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const educationIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)

    profile.education.splice(educationIndex, 1);

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Route           GET api/profile/github/:username
// Description     Get user repos from github
// Access          Public
router.get('/github/:username', async (req, res) => {
  try {
    const url = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`

    const gitHubResponse = await axios.get(url);
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;
