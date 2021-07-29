const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  numberOfPlayers: {
    type: Number,
    default: 3
  },
  otherPlayers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Table = mongoose.model('table', TableSchema);
