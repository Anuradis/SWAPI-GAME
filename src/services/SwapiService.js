import axios from 'axios'
import { PEOPLE_RULES_DEF } from '@/constants/common'
import Starship from '@/models/Starship'
import Person from '@/models/Person'

export default {
  async fetchSWAPIByResourceType(type, number) {
    const response = await axios.get(`https://swapi.dev/api/${type}/${number}`)
    return Object.keys(response.data).includes(PEOPLE_RULES_DEF.compareAttr)
      ? Person.fromAPI(response.data)
      : Starship.fromAPI(response.data)
  }
}
