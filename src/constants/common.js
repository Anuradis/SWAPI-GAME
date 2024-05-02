import starWarsBG from '@/assets/img/star_wars_bg.jpg'
import starWarsWinner from '@/assets/img/star_wars_winner.jpg'
export const STAR_WARS_WINNER = Object.freeze({
  get src() {
    return starWarsWinner
  },
  title: 'Star Wars Winner image'
})

export const STAR_WARS_BG = Object.freeze({
  get src() {
    return starWarsBG
  },
  title: 'Star Wars background image'
})

export const SETTINGS_CARD = Object.freeze({
  title: 'Settings',
  color: 'grey'
})

export const SUPPORTED_SWAPI_TYPES = Object.freeze({
  people: 'people',
  starships: 'starships'
})

export const PEOPLE_RULES_DEF = Object.freeze({
  type: SUPPORTED_SWAPI_TYPES.people,
  minNumber: 1,
  maxNumber: 82,
  compareAttr: 'mass',
  cardColor: 'primary'
})

export const STARSHIPS_RULES_DEF = Object.freeze({
  type: SUPPORTED_SWAPI_TYPES.starships,
  minNumber: 1,
  maxNumber: 36,
  compareAttr: 'crew',
  cardColor: 'secondary'
})

export const INITAL_CARDS_DEF = Object.freeze([
  {
    resourceType: PEOPLE_RULES_DEF.people,
    color: PEOPLE_RULES_DEF.color,
    name: null,
    height: null,
    mass: null,
    hairColor: null,
    skinColor: null,
    eyeColor: null,
    birthYear: null,
    gender: null
  }
])

export const GRADIENT_DEF = 'to top right, rgba(0,0,0,.9), rgba(0,0,0,.5)'
export const INITIAL_PLAYERS = {
  player1: {
    nickname: 'Player 1',
    score: 0
  },
  player2: {
    nickname: 'CPU',
    score: 0
  }
}
