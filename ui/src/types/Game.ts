import Team from './Team';
import Word from './Word';

interface Game {
  roomCode: string;
  wordList: Word[];
  activeTeam: Team;
}

export default Game;
