import { Document } from 'mongoose';
import Player from './Player';

interface Room extends Document {
  code: string;
  players: Player[];
}

export default Room;
