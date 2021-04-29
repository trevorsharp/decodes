import React, { useState } from 'react';
import {
  Button,
  Entry,
  Label,
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

  return (
    <Container>
      <Title>daCODEaz</Title>
      <Label>Welcome to daCODEaz!</Label>
      <ToolTip>
        {nameError !== '' && <ToolTipText>{nameError}</ToolTipText>}
        <Entry
          type="text"
          placeholder="Enter Player Name"
          toUpperCase={false}
          maxLength={30}
          value={playerName}
          onInput={(e) => updatePlayerName((e.target as HTMLInputElement).value)}
          isError={nameError !== ''}
        />
      </ToolTip>
      <Label>then</Label>
      <ButtonContainer>
        {roomCode !== '' && (
          <HideButton onClick={() => setHideCode(!hideCode)} src={hideCode ? showIcon : hideIcon} />
        )}
        <ToolTip>
          {codeError !== '' && <ToolTipText>{codeError}</ToolTipText>}
          <Entry
            type={hideCode ? 'password' : 'text'}
            placeholder="Enter Room Code"
            toUpperCase={true}
            maxLength={6}
            value={roomCode}
            onInput={(e) => updateRoomCode((e.target as HTMLInputElement).value)}
            isError={codeError !== ''}
          />
        </ToolTip>
      </ButtonContainer>
      <Button onClick={enterRoom}>Join Room</Button>
      <Label>- or -</Label>
      <Button onClick={createNewRoom}>Create a Room</Button>
    </Container>
  );
};

export default RoomSelection;
