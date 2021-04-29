import RoomModel from '../models/RoomModel';
import Player from '../types/Player';
import Team from '../types/Team';
import GameService from './GameService';

class RoomService {
  static cleanCode = (roomCode: string) => {
    return roomCode.replace(/\W/g, '').toUpperCase().trim();
  };

  private static cleanPlayerName = (name: string) => {
    return name
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  static getRoom = async (roomCode: string) => {
    return await RoomModel.findOne({ code: roomCode }).exec();
  };

  static createRoom = async (roomCode: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const room = await RoomService.getRoom(roomCode);
      if (room !== null) {
        return `Room with code '${roomCode}' already exists`;
      }

      const newRoom = new RoomModel({ code: roomCode, players: [] });
      await newRoom.save();

      return await GameService.createGame(roomCode);
    } catch (err) {
      return `Failed to create room with code ${roomCode} - ${err.message}`;
    }
  };

  static addPlayerToRoom = async (
    roomCode: string,
    playerId: string,
    name: string,
    shouldCreateNewRoom: boolean = false
  ) => {
    try {
      name = RoomService.cleanPlayerName(name);

      roomCode = RoomService.cleanCode(roomCode);
      var room = await RoomService.getRoom(roomCode);
      if (room === null) {
        if (!shouldCreateNewRoom) {
          return `Room with code '${roomCode}' does not exist`;
        }
        const error = await RoomService.createRoom(roomCode);
        if (error !== '') return error;
      }

      room = await RoomService.getRoom(roomCode);
      if (room === null) {
        return `Room with code '${roomCode}' does not exist`;
      }

      if (room.players.find((x) => x.id === playerId)) {
        return `Player is already added to the room`;
      }

      if (room.players.find((x) => x.name.toLowerCase() === name.toLowerCase())) {
        return `Player with same name is already added to the room`;
      }

      const teamAssignment =
        room.players.filter((x) => x.team === Team.Red).length >
        room.players.filter((x) => x.team === Team.Blue).length
          ? Team.Blue
          : Team.Red;

      const newPlayer: Player = { id: playerId, name, team: teamAssignment, leader: false };
      room.players.push(newPlayer);
      await RoomModel.updateOne({ code: roomCode }, room, { runValidators: true });
    } catch (err) {
      return `Failed to add player to room - ${err.message}`;
    }

    return '';
  };

  static removePlayerFromRoom = async (roomCode: string, playerId: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const room = await RoomService.getRoom(roomCode);
      if (room === null) {
        return `Room with code '${roomCode}' does not exist`;
      }

      room.players = room.players.filter((x) => x.id !== playerId);

      if (room.players.length === 0) {
        await GameService.deleteGame(roomCode);
        await RoomModel.deleteOne({ code: roomCode });
        return '';
      }

      await RoomModel.updateOne({ code: roomCode }, room, { runValidators: true });
    } catch (err) {
      return `Failed to remove player from room - ${err.message}`;
    }

    return '';
  };

  static switchTeam = async (roomCode: string, playerId: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const room = await RoomService.getRoom(roomCode);
      if (room === null) {
        return `Room with code '${roomCode}' does not exist`;
      }

      if (!room.players.find((x) => x.id === playerId)) {
        return `Player is not in the room`;
      }

      const index = room.players.findIndex((x) => x.id === playerId);
      room.players[index].team = room.players[index].team === Team.Red ? Team.Blue : Team.Red;
      await RoomModel.updateOne({ code: roomCode }, room, { runValidators: true });
    } catch (err) {
      return `Failed to switch player's team - ${err.message}`;
    }

    return '';
  };

  static toggleLeader = async (roomCode: string, playerId: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const room = await RoomService.getRoom(roomCode);
      if (room === null) {
        return `Room with code '${roomCode}' does not exist`;
      }

      if (!room.players.find((x) => x.id === playerId)) {
        return `Player is not in the room`;
      }

      const index = room.players.findIndex((x) => x.id === playerId);
      room.players[index].leader = !room.players[index].leader;
      await RoomModel.updateOne({ code: roomCode }, room), { runValidators: true };
    } catch (err) {
      return `Failed to toggle player as a leader - ${err.message}`;
    }

    return '';
  };

  static resetLeaders = async (roomCode: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const room = await RoomService.getRoom(roomCode);
      if (room === null) {
        return `Room with code '${roomCode}' does not exist`;
      }

      room.players.forEach((player) => (player.leader = false));
      await RoomModel.updateOne({ code: roomCode }, room), { runValidators: true };
    } catch (err) {
      return `Failed to reset all player's leader status - ${err.message}`;
    }

    return '';
  };
}

export default RoomService;
