export default class Player {
  name = null
  score = null

  constructor(apiPlayer) {
    this.name = apiPlayer.name
    this.score = apiPlayer.score
  }

  static fromAPI(apiPlayer) {
    return new Player(apiPlayer)
  }

  static toAPI(player) {
    return {
      name: player.nickname,
      score: player.score
    }
  }
}
