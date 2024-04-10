import { STARSHIPS_RULES_DEF } from '@/constants/common'
/**
 * Starship model, includes core fields only for presentation purpose
 */
export default class Starship {
  resourceType = null
  color = null
  name = null
  model = null
  manufacturer = null
  costInCredits = null
  length = null
  maxAtmospheringSpeed = null
  crew = null
  passengers = null
  cargoCapacity = null
  consumables = null
  hyperdriveRating = null
  MGLT = null
  starshipClass = null

  constructor(apiStarship) {
    this.resourceType = STARSHIPS_RULES_DEF.type
    this.color = STARSHIPS_RULES_DEF.cardColor
    this.name = apiStarship.name
    this.model = apiStarship.model
    this.manufacturer = apiStarship.manufacturer
    this.costInCredits = apiStarship.cost_in_credits
    this.length = apiStarship.length
    this.maxAtmospheringSpeed = apiStarship.max_atmosphering_speed
    this.crew = apiStarship.crew
    this.passengers = apiStarship.passengers
    this.cargoCapacity = apiStarship.cargo_capacity
    this.consumables = apiStarship.consumables
    this.hyperdriveRating = apiStarship.hyperdrive_rating
    this.MGLT = apiStarship.MGLT
    this.starshipClass = apiStarship.starship_class
  }

  static fromAPI(apiPlayer) {
    return new Starship(apiPlayer)
  }
}
