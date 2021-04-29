import React from 'react';
import Room from '../../types/Room';
import Game from '../../types/Game';
import { playerId } from '../../socket';
import { Button, ButtonBar, Label, Spacer } from '../App/App.styles';
import { Container, Display, Detail, PlayerName, Icon } from './Team.styles';
import redMagnify from '../../images/redMagnify.svg';
import blueMagnify from '../../images/blueMagnify.svg';

interface TeamProps {
  room: Room;
  game: Game;
  changeTeam: () => void;
  toggleLeader: () => void;
}

interface TeamDetailProps {
  room: Room;
  game: Game;
  color: number;
}

const TeamDetail = (props: TeamDetailProps) => {
  return (
    <Detail color={props.color === 0 ? 'red' : 'blue'}>
      <Label>{`${
        props.game.wordList?.filter(
          (word) => word.assignment === props.color && word.selected === true
        ).length
      } / ${props.game.wordList?.filter((word) => word.assignment === props.color).length}`}</Label>
      <Label>{`${props.color === 0 ? 'Red' : 'Blue'} Team`}</Label>
      {props.room.players
        .filter((player) => player.team === props.color)
        .map((player) => (
          <PlayerName key={player.id} activePlayer={player.id === playerId}>
            {player.leader ? <Icon src={props.color === 0 ? redMagnify : blueMagnify} /> : ''}
            {player.name}
          </PlayerName>
        ))}
    </Detail>
  );
};

const Team = (props: TeamProps) => {
  return (
    <Container>
      <Display>
        <TeamDetail color={0} room={props.room} game={props.game} />
        <TeamDetail color={1} room={props.room} game={props.game} />
      </Display>
      <ButtonBar>
        <Spacer />
        <Button width="50%" onClick={props.changeTeam}>
          Change Team
        </Button>
        <Spacer />
      </ButtonBar>
      <ButtonBar>
        <Spacer />
        <Button width="50%" onClick={props.toggleLeader}>
          Change Role
        </Button>
        <Spacer />
      </ButtonBar>
    </Container>
  );
};

export default Team;
