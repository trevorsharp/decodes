import Database from '../utilities/Database';
import Room from '../types/Room';

const RoomSchema = new Database.Schema({
  code: {
    type: String,
    minLength: 6,
    maxLength: 6,
    required: true,
    index: { dropDups: true, unique: true },
  },
  players: {
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, minLength: 1, maxLength: 30, required: true },
        team: {
          type: Number,
          enum: [0, 1],
          required: true,
        },
        guesser: { type: Boolean, required: true },
      },
    ],
    validate: [(arr: any[]) => arr.length <= 20, '{PATH} exceeds limit of 20 items'],
  },
});

const RoomModel: Database.Model<Room> = Database.model('Room', RoomSchema);

export default RoomModel;
