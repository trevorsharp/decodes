import { Document } from 'mongoose';
import Team from './Team';
import Word from './Word';

interface Game extends Document {
  roomCode: string;
  wordList: Word[];
  activeTeam: Team;
}

export default Game;
