const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tables'
  },
  score: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      points: {
        type: Number,
        default: 0
      }
    }
  ],
  // TODO array of deals
  deals: [

  ]
});

module.exports = Game = mongoose.model('game', GameSchema);
