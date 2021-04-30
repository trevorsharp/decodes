import Team from '../types/Team';
import WordService from './WordService';
import RoomService from './RoomService';
import GameModel from '../models/GameModel';

class GameService {
  static getGame = async (roomCode: string) => {
    return await GameModel.findOne({ roomCode }).exec();
  };

  static createGame = async (roomCode: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const room = await RoomService.getRoom(roomCode);
      if (room === null) {
        return `No room exists with that code`;
      }

      const error = await RoomService.resetGuessers(roomCode);
      if (error !== '') {
        return error;
      }

      var startingTeam = Team.Red;
      const game = await GameService.getGame(roomCode);
      if (game !== null) {
        startingTeam =
          game.wordList.filter((x) => x.assignment === (Team.Red as number)).length === 9
            ? Team.Blue
            : Team.Red;
        GameService.deleteGame(roomCode);
      }

      const wordList = WordService.getWordList(startingTeam);

      const newGame = new GameModel({ roomCode, wordList, activeTeam: startingTeam });
      await newGame.save();
    } catch (err) {
      return `Failed to create new game - ${err.message}`;
    }

    return '';
  };

  static selectWord = async (roomCode: string, index: number) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const game = await GameService.getGame(roomCode);
      if (game === null) {
        return `Game for room does not exist`;
      }

      if (index >= game.wordList.length || index < 0) {
        return `Word selection index is out of bounds`;
      }

      if (game.wordList[index].selected) {
        return `Word is already selected`;
      }

      game.wordList[index].selected = true;
      if ((game.wordList[index].assignment as number) !== (game.activeTeam as number)) {
        game.activeTeam = game.activeTeam === Team.Red ? Team.Blue : Team.Red;
      }

      await GameModel.updateOne({ roomCode }, game, { runValidators: true });
    } catch (err) {
      return `Failed to update selected word - ${err.message}`;
    }

    return '';
  };

  static endTurn = async (roomCode: string) => {
    try {
      roomCode = RoomService.cleanCode(roomCode);
      const game = await GameService.getGame(roomCode);
      if (game === null) {
        return `Game for room does not exist`;
      }

      game.activeTeam = game.activeTeam === Team.Red ? Team.Blue : Team.Red;
      await GameModel.updateOne({ roomCode }, game, { runValidators: true });
    } catch (err) {
      return `Failed to update selected word - ${err.message}`;
    }

    return '';
  };

  static deleteGame = async (roomCode: string) => {
    await GameModel.deleteOne({ roomCode: RoomService.cleanCode(roomCode) });
  };
}

export default GameService;
