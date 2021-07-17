const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  secondPlayer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  thirdPlayer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  numberOfPlayers: {
    type: Number,
    default: 3
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Table = mongoose.model('table', TableSchema);
