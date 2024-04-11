import Player from '@/models/Player'
/**
 * GameResult model, includes core fields only for presentation purpose
 */
export default class GameResult {
  player1 = null
  player2 = null
  createdTimestamp = null
  totalPoints = null

  constructor(apiGame) {
    this.player1 = new Player(apiGame.player1)
    this.player2 = new Player(apiGame.player2)
    this.updatedTimestamp = apiGame.updated_timestamp
    this.totalPoints = apiGame.total_points
  }

  static fromAPI(apiGame) {
    return new GameResult(apiGame)
  }

  static toAPI(game) {
    return {
      player1: Player.toAPI(game.player1),
      player2: Player.toAPI(game.player2),
      created_timestamp: Date.now(),
      total_points: game.player1.score + game.player2.score
    }
  }
}
