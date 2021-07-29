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
  deals: [
    { 
      usersCards: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
          },
          // Cards in each deal will be an array of numbers.
          // Each number will represent different card for example: 7 => queen heart
          cards: [
            {
              figure: {
                type: Number
              },
              special: {
                type: Boolean,
                default: false
              },
            }
          ]
        }
      ],
      moves: [
        [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'users'
            },
            card: {
              figure: {
                type: Number
              },
              special: {
                type: Boolean,
                default: false
              },
            }
          }
        ]
      ]
    }
  ]
});

module.exports = Game = mongoose.model('game', GameSchema);
