const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  special: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String
  },
  games: {
    winner: {
      type: Number,
      default: 0
    },
    secondPlace: {
      type: Number,
      default: 0
    },
    thirdPlace: {
      type: Number,
      default: 0
    },
    forthPlace: {
      type: Number,
      default: 0
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
