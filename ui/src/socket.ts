import { io } from 'socket.io-client';

const socket = io(`${window.location.href.replace(window.location.pathname, '')}`, {
  path: '/api',
});

const playerId = `${Math.floor(Math.random() * 1000000000)}`;

export { socket, playerId };
