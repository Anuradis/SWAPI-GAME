import starWarsBG from '@/assets/img/star_wars_bg.jpg'

export const STAR_WARS_BG = {
  get src() {
    return starWarsBG
  },
  title: 'Star Wars background image'
}

export const SWAPI_TYPES = Object.freeze({
  people: 'people',
  starships: 'starships'
})
