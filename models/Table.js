const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
  // TODO add another 2 players to table schema which were not admins
});

module.exports = Table = mongoose.model('table', TableSchema);
