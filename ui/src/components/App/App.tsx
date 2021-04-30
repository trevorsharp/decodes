import React, { useEffect, useState } from 'react';
import { socket, playerId } from '../../socket';
import Game from '../../types/Game';
import Room from '../../types/Room';
import WordType from '../../types/Word';
import TeamType from '../../types/Team';
import WordAssignment from '../../types/WordAssignment';
import RoomSelection from '../RoomSelection';
import {
  Title,
  Button,
  ButtonBar,
  Spacer,
  GameContainer,
  SideBar,
  Label,
  GameBoard,
  Word,
  TeamContainer,
  TeamDetail,
  PlayerName,
  Icon,
} from './App.styles';
import redMagnify from '../../images/redMagnify.svg';
import blueMagnify from '../../images/blueMagnify.svg';

const App = () => {
  const [room, setRoom] = useState<Room | undefined>();
  const [game, setGame] = useState<Game | undefined>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    socket.on('updatedRoom', (data) => {
      setRoom(data);
    });

    socket.on('updatedGame', (data) => {
      setGame(data);
    });

    socket.on('error', (data) => {
      console.error(data);
      setError(data);
    });
  }, []);

  const joinRoom = (roomCode: string, playerName: string) => {
    socket.emit('connectToRoom', { roomCode, playerName, playerId });
  };

  const createRoom = (playerName: string) => {
    socket.emit('createRoom', { playerName, playerId });
  };

  const [copyCodeText, setCopyCodeText] = useState('Copy Code');

  const copyRoomCode = () => {
    room?.code && navigator.clipboard.writeText(room?.code);
    setTimeout(() => setCopyCodeText('Copy Code'), 5000);
    setCopyCodeText('Copied!');
  };

  const switchTeams = () => {
    socket.emit('switchTeams', { playerId });
  };

  const toggleGuesser = () => {
    socket.emit('toggleGuesser', { playerId });
  };

  const teamsRemainingWords = (team: TeamType) =>
    game?.wordList?.filter(
      (word) => (word.assignment as number) === (team as number) && word.selected === false
    )?.length;

  const playerIsGuesser = (): boolean =>
    room?.players?.find((player) => player.id === playerId)?.guesser === true;

  const playerIsOnActiveTeam = (): boolean =>
    room?.players?.find((player) => player.id === playerId)?.team === game?.activeTeam;

  const isBombSelected = (): boolean =>
    game?.wordList?.find((word) => word.assignment === WordAssignment.Bomb)?.selected === true;

  const isGameOver = (): boolean => hasTeamWon(TeamType.Red) || hasTeamWon(TeamType.Blue);

  const hasTeamWon = (team: TeamType): boolean =>
    teamsRemainingWords(team) === 0 || (isBombSelected() && game?.activeTeam === team);

  const canSelectWord = (word: WordType): boolean =>
    isGameOver() || !playerIsGuesser() || !playerIsOnActiveTeam() ? false : !word.selected;

  const selectWord = (index: number) => {
    if (game?.wordList[index] && canSelectWord(game?.wordList[index])) {
      socket.emit('selectWord', { index });
    }
  };

  const endTurn = () => {
    if (!isGameOver()) {
      socket.emit('endTurn');
    }
  };

  const startNewGame = () => {
    socket.emit('startNewGame');
  };

  return (
    <>
      {room !== undefined && game !== undefined ? (
        <>
          <ButtonBar>
            <Title>deCODES</Title>
            <Spacer />
            <Button width="125px" onClick={copyRoomCode}>
              {copyCodeText}
            </Button>
            <Button width="125px" onClick={() => window.location.reload()}>
              Leave Room
            </Button>
          </ButtonBar>
          <GameContainer>
            <SideBar>
              <ButtonBar>
                <Spacer />
                <Label large={true} color={`${game.activeTeam === 0 ? 'red' : 'blue'}`}>{`${
                  isGameOver()
                    ? `${hasTeamWon(TeamType.Red) ? 'Red' : 'Blue'} Team Wins!`
                    : game.activeTeam === 0
                    ? "Red Team's Turn"
                    : "Blue Team's Turn"
                }`}</Label>
                <Spacer />
              </ButtonBar>
              <ButtonBar>
                <Spacer />
                <Label large={true} color="red">
                  {teamsRemainingWords(TeamType.Red)}
                </Label>
                <Label large={true}>&nbsp;&nbsp;-&nbsp;&nbsp;</Label>
                <Label large={true} color="blue">
                  {teamsRemainingWords(TeamType.Blue)}
                </Label>
                <Spacer />
              </ButtonBar>
              <TeamContainer>
                <Team team={TeamType.Red} room={room} game={game} />
                <Team team={TeamType.Blue} room={room} game={game} />
              </TeamContainer>
              <ButtonBar>
                <Button width="50%" onClick={startNewGame}>
                  New Game
                </Button>
                <Spacer />
                <Button width="50%" onClick={endTurn}>
                  End Turn
                </Button>
              </ButtonBar>
              <ButtonBar>
                <Button width="50%" onClick={switchTeams}>
                  Switch Teams
                </Button>
                <Spacer />
                <Button width="50%" onClick={toggleGuesser}>
                  Change Role
                </Button>
              </ButtonBar>
            </SideBar>
            <GameBoard>
              {game.wordList?.map((word, index) => (
                <Word
                  key={word.value}
                  selected={word.selected}
                  color={word.assignment.toString()}
                  guesser={room.players.find((player) => player.id === playerId)?.guesser ?? false}
                  onClick={() => selectWord(index)}
                  isClickable={canSelectWord(word)}
                  gameOver={isGameOver()}
                >
                  {word.value}
                </Word>
              ))}
            </GameBoard>
          </GameContainer>
        </>
      ) : (
        <>
          <RoomSelection joinRoom={joinRoom} createRoom={createRoom} error={error} />
        </>
      )}
    </>
  );
};

interface TeamProps {
  room: Room;
  game: Game;
  team: TeamType;
}

const Team = (props: TeamProps) => {
  return (
    <TeamDetail color={props.team === TeamType.Red ? 'red' : 'blue'}>
      <Label>{`${props.team === TeamType.Red ? 'Red' : 'Blue'} Team`}</Label>
      {props.room.players
        .filter((player) => player.team === props.team)
        .map((player) => (
          <PlayerName key={player.id} activePlayer={player.id === playerId}>
            {!player.guesser ? (
              <Icon src={props.team === TeamType.Red ? redMagnify : blueMagnify} />
            ) : (
              ''
            )}
            {player.name}
          </PlayerName>
        ))}
    </TeamDetail>
  );
};

export default App;
