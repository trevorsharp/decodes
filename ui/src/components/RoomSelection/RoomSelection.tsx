import React, { useState } from 'react';
import {
  Button,
  Entry,
  Label,
  Text,
  Title,
  Container,
  HideButton,
  ButtonContainer,
  ToolTip,
  ToolTipText,
} from './RoomSelection.styles';
import hideIcon from '../../images/eye-hide.png';
import showIcon from '../../images/eye-show.png';

interface Props {
  joinRoom: (roomCode: string, playerName: string) => void;
  createRoom: (playerName: string) => void;
  error: string;
}

const RoomSelection = (props: Props) => {
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [hideCode, setHideCode] = useState(true);

  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');

  const updatePlayerName = (value: string) => {
    setPlayerName(value);
    setNameError('');
  };

  const updateRoomCode = (value: string) => {
    setRoomCode(value);
    setCodeError('');
  };

  const createNewRoom = () => {
    setCodeError('');
    if (playerName === '') setNameError('Please Enter a Player Name');
    if (nameError !== '') return;

    props.createRoom(playerName);
  };

  const enterRoom = () => {
    if (playerName === '') setNameError('Please Enter a Player Name');
    if (!roomCode.toUpperCase().match('^[A-Z0-9]{6}$')) setCodeError('Invalid Room Code');
    if (nameError !== '' || codeError !== '') return;

    props.joinRoom(roomCode, playerName);
  };

  const handlePlayerNameKeyDown = (event: any): void => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      createNewRoom();
    }
  };

  const handleRoomCodeKeyDown = (event: any): void => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      enterRoom();
    }
  };

  return (
    <Container>
      <Title>deCODES</Title>
      <Label>Welcome to deCODES!</Label>
      <Text>A minimalist version of the game designed with streamers in mind</Text>
      <Text topMargin={true}>Let's start with a name...</Text>
      <ToolTip>
        {nameError !== '' && <ToolTipText>{nameError}</ToolTipText>}
        <Entry
          type="text"
          placeholder="Enter Player Name"
          toUpperCase={false}
          maxLength={20}
          value={playerName}
          onInput={(e) => updatePlayerName((e.target as HTMLInputElement).value)}
          onKeyPress={handlePlayerNameKeyDown}
          isError={nameError !== ''}
        />
      </ToolTip>
      <Text>and then</Text>
      <Button onClick={createNewRoom}>Create a Room</Button>
      <Text>or join some friends</Text>
      <ButtonContainer>
        {roomCode !== '' && (
          <HideButton onClick={() => setHideCode(!hideCode)} src={hideCode ? showIcon : hideIcon} />
        )}
        <ToolTip>
          {codeError !== '' && <ToolTipText>{codeError}</ToolTipText>}
          <Entry
            type="text"
            placeholder="Enter Room Code"
            hideText={hideCode}
            toUpperCase={true}
            maxLength={6}
            value={roomCode}
            onInput={(e) => updateRoomCode((e.target as HTMLInputElement).value)}
            onKeyPress={handleRoomCodeKeyDown}
            isError={codeError !== ''}
          />
        </ToolTip>
      </ButtonContainer>
      <Button onClick={enterRoom}>Join Room</Button>
      {props.error !== '' && (
        <Text topMargin={true} isError={true}>
          {props.error}
        </Text>
      )}
    </Container>
  );
};

export default RoomSelection;
