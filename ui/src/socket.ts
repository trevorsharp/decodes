import { io } from 'socket.io-client';

const socket = io('http://192.168.40.17:3001');

const playerId = `${Math.floor(Math.random() * 1000000000)}`;

export { socket, playerId };
