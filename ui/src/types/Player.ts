import Team from './Team';

interface Player {
  id: string;
  name: string;
  team: Team;
  leader: boolean;
}

export default Player;
