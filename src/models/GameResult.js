import Player from '@/models/Player'
/**
 * GameResult model, includes core fields only for presentation purpose
 */
export default class GameResult {
  player1 = null
  player2 = null

  constructor(apiGame) {
    this.player1 = new Player(apiGame.player1)
    this.player2 = new Player(apiGame.player2)
  }

  static fromAPI(apiGame) {
    return new GameResult(apiGame)
  }

  toAPI(apiGame) {
    this.player1 = Player.toAPI(apiGame.player1)
    this.player1 = Player.toAPI(apiGame.player1)
  }
}
