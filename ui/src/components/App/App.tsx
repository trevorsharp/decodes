import React, { useEffect, useState } from 'react';
import { socket, playerId } from '../../socket';
import Game from '../../types/Game';
import Room from '../../types/Room';
import WordType from '../../types/Word';
import TeamType from '../../types/Team';
import WordAssignment from '../../types/WordAssignment';
import RoomSelection from '../RoomSelection';
import Team from '../Team';
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
} from './App.styles';

const App = () => {
  const [room, setRoom] = useState<Room | undefined>();
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    socket.on('updatedRoom', (data) => {
      setRoom(data);
    });

    socket.on('updatedGame', (data) => {
      setGame(data);
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
    // room?.code && navigator.clipboard.writeText(room?.code);
    setTimeout(() => setCopyCodeText('Copy Code'), 5000);
    setCopyCodeText('Copied!');
  };

  const changeTeam = () => {
    socket.emit('switchTeams', { playerId });
  };

  const toggleLeader = () => {
    socket.emit('toggleLeader', { playerId });
  };

  const playerIsLeader = (): boolean =>
    room?.players?.find((player) => player.id === playerId)?.leader === true;

  const playerIsOnActiveTeam = (): boolean =>
    room?.players?.find((player) => player.id === playerId)?.team === game?.activeTeam;

  const isBombSelected = (): boolean =>
    game?.wordList?.find((word) => word.assignment === WordAssignment.Bomb)?.selected === true;

  const isGameOver = (): boolean => hasTeamWon(TeamType.Red) || hasTeamWon(TeamType.Blue);

  const hasTeamWon = (team: TeamType): boolean =>
    game?.wordList?.filter(
      (word) => (word.assignment as number) === (team as number) && word.selected === false
    )?.length === 0 ||
    (isBombSelected() && game?.activeTeam === team);

  const canSelectWord = (word: WordType): boolean =>
    isGameOver() || playerIsLeader() || !playerIsOnActiveTeam() ? false : !word.selected;

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
            <Title>daCODEaz</Title>
            <Spacer />
            <Button width="115px" onClick={copyRoomCode}>
              {copyCodeText}
            </Button>
            <Button width="115px" onClick={() => window.location.reload()}>
              Leave Room
            </Button>
          </ButtonBar>
          <GameContainer>
            <SideBar>
              <ButtonBar>
                <Spacer />
                <Label color={`${game.activeTeam === 0 ? 'red' : 'blue'}`}>{`${
                  isGameOver()
                    ? `${hasTeamWon(TeamType.Red) ? 'Red' : 'Blue'} Team Wins!`
                    : game.activeTeam === 0
                    ? "Red Team's Turn"
                    : "Blue Team's Turn"
                }`}</Label>
                <Spacer />
              </ButtonBar>
              <ButtonBar>
                <Button width="43%" onClick={startNewGame}>
                  New Game
                </Button>
                <Spacer />
                <Button width="43%" onClick={endTurn}>
                  End Turn
                </Button>
              </ButtonBar>
              <Team game={game} room={room} changeTeam={changeTeam} toggleLeader={toggleLeader} />
            </SideBar>
            <GameBoard>
              {game.wordList?.map((word, index) => (
                <Word
                  key={word.value}
                  selected={word.selected}
                  color={word.assignment.toString()}
                  leader={room.players.find((player) => player.id === playerId)?.leader ?? false}
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
          <RoomSelection joinRoom={joinRoom} createRoom={createRoom} />
        </>
      )}
    </>
  );
};

export default App;
