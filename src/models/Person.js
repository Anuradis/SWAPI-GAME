import { PEOPLE_RULES_DEF } from '@/constants/common'
/**
 * Person model, includes core fields only for presentation purpose
 */
export default class Person {
  resourceType = null
  color = null
  name = null
  height = null
  mass = null
  hairColor = null
  skinColor = null
  eyeColor = null
  birthYear = null
  gender = null

  constructor(apiPerson) {
    this.resourceType = PEOPLE_RULES_DEF.type
    this.color = this.name = PEOPLE_RULES_DEF.cardColor
    this.height = apiPerson.height
    this.mass = apiPerson.mass
    this.hairColor = apiPerson.hair_color
    this.skinColor = apiPerson.skin_color
    this.eyeColor = apiPerson.eye_color
    this.birthYear = apiPerson.birth_year
    this.gender = apiPerson.gender
  }

  static fromAPI(apiPerson) {
    return new Person(apiPerson)
  }
}
