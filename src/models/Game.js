import Player from '@/models/Player'
/**
 * Game model, includes core fields only for presentation purpose
 */
export default class Game {
  player1 = null
  player2 = null

  constructor(apiGame) {
    this.player1 = new Player(apiGame.player1)
    this.player2 = new Player(apiGame.player2)
  }

  static fromAPI(apiGame) {
    return new Game(apiGame)
  }

  toAPI(apiGame) {
    this.player1 = Player.toAPI(apiGame.player1)
    this.player1 = Player.toAPI(apiGame.player1)
  }
}
