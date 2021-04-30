import Team from './Team';

interface Player {
  id: string;
  name: string;
  team: Team;
  guesser: boolean;
}

export default Player;
