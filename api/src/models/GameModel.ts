import Database from '../utilities/Database';
import Game from '../types/Game';

const GameSchema = new Database.Schema({
  roomCode: {
    type: String,
    minLength: 6,
    maxLength: 6,
    required: true,
    index: { unique: true, dropDups: true },
  },
  activeTeam: { type: Number, enum: [0, 1], required: true },
  wordList: {
    type: [
      {
        value: { type: String, minLength: 1, maxLength: 30, required: true },
        assignment: {
          type: Number,
          enum: [0, 1, 2, 3],
          required: true,
        },
        selected: { type: Boolean, required: true },
      },
    ],
    validate: [(arr: any[]) => arr.length === 25, '{PATH} does not have 25 items'],
  },
});

const GameModel: Database.Model<Game> = Database.model('Game', GameSchema);

export default GameModel;
