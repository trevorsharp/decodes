import { io } from 'socket.io-client';

const socket = io(`/`);

const playerId = `${Math.floor(Math.random() * 1000000000)}`;

export { socket, playerId };
