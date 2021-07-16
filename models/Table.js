const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
  // TODO add another 2 players to table schema which were not admins
});
