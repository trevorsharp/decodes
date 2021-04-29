import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import RoomService from './services/RoomService';
import GameService from './services/GameService';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://192.168.40.17:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  var roomCode: string;
  var playerId: string;

  const handleError = (error: string) => {
    if (error !== '') {
      console.log('ERROR -', error);
      if (roomCode) {
        io.to(roomCode).emit('error', error);
      }
      return false;
    }
    return true;
  };

  const handleStateChange = async (error: string) => {
    handleRoomStateChange(error);
    handleGameStateChange(error);
  };

  const handleRoomStateChange = async (error: string) => {
    if (handleError(error)) {
      const updatedRoom = await RoomService.getRoom(roomCode);
      if (updatedRoom !== null) {
        io.to(roomCode).emit('updatedRoom', updatedRoom);
      }
    }
  };

  const handleGameStateChange = async (error: string) => {
    if (handleError(error)) {
      const updatedGame = await GameService.getGame(roomCode);
      if (updatedGame !== null) {
        io.to(roomCode).emit('updatedGame', updatedGame);
      }
    }
  };

  socket.on('disconnect', async () => {
    console.log('disconnect', playerId);
    if (roomCode) {
      handleRoomStateChange(await RoomService.removePlayerFromRoom(roomCode, playerId));
      socket.leave(roomCode);
    }
  });

  socket.on('createRoom', async (data) => {
    console.log('createRoom', JSON.stringify(data));
    playerId = data.playerId;
    roomCode = RoomService.cleanCode(Math.random().toString(36).slice(1, 8).toUpperCase());
    socket.join(roomCode);
    handleStateChange(await RoomService.addPlayerToRoom(roomCode, playerId, data.playerName, true));
  });

  socket.on('connectToRoom', async (data) => {
    console.log('connectToRoom', JSON.stringify(data));
    playerId = data.playerId;
    roomCode = RoomService.cleanCode(data.roomCode);
    socket.join(roomCode);
    handleStateChange(await RoomService.addPlayerToRoom(roomCode, playerId, data.playerName));
  });

  socket.on('switchTeams', async () => {
    console.log('switchTeams', playerId);
    handleRoomStateChange(await RoomService.switchTeam(roomCode, playerId));
  });

  socket.on('toggleLeader', async () => {
    console.log('toggleLeader', playerId);
    handleRoomStateChange(await RoomService.toggleLeader(roomCode, playerId));
  });

  socket.on('selectWord', async (data) => {
    console.log('selectWord', playerId, data.index);
    handleGameStateChange(await GameService.selectWord(roomCode, data.index));
  });

  socket.on('endTurn', async () => {
    console.log('endTurn', playerId);
    handleGameStateChange(await GameService.endTurn(roomCode));
  });

  socket.on('startNewGame', async () => {
    console.log('startNewGame', playerId);
    handleStateChange(await GameService.createGame(roomCode));
  });
});

console.log('Starting socket server');
httpServer.listen(3001);
