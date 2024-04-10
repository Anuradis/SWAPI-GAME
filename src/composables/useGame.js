import { reactive, readonly } from 'vue'
import SwapiService from '@/services/SwapiService'
import useSnackbar from '@/composables/useSnackbar'
const state = reactive({
  hash: '',
  loading: false,
  cards: [],
  //can't see uid in SWAPI therefore name used;/
  winningCardName: null
})

export default function useGame() {
  // === Composables ===
  const snackbar = useSnackbar()

  // === Setters ===
  /**
   * Sets fetched and mapped data as cards, order is crucial for scoring sheet
   *
   * @param {resourceType} String - SWAPI resource type
   * @param {firstPlayerCard} Number - card fetched based on first user random number
   * @param {secondPlayerCard} Number - card fetched based on second user random number
   */
  const setCards = (firstPlayerCard, secondPlayerCard) => {
    state.cards = [firstPlayerCard, secondPlayerCard]
  }

  const setWinningCardName = (winningCardName) => {
    state.winningCardName = winningCardName
  }

  /**
   * Function loads random cards for players whenever play button used
   *
   * @param {resourceType} String - SWAPI resource type
   * @param {firstRandomNumber} Number - random number of resource for 1-st player
   * @param {secondRandomNumber} Number - random number of resource for 2-nd player
   */
  const loadCards = async (resourceType, firstRandomNumber, secondRandomNumber) => {
    try {
      state.loading = true

      const [firstPlayerCard, secondPlayerCard] = await Promise.all([
        SwapiService.fetchSWAPIByResourceType(resourceType, firstRandomNumber),
        SwapiService.fetchSWAPIByResourceType(resourceType, secondRandomNumber)
      ])

      setCards(firstPlayerCard, secondPlayerCard)
      setWinningCardName()
      console.log(state.cards, 'cards')
    } catch (err) {
      snackbar.showSnackbar(err)
      console.error(err)
    } finally {
      state.loading = false
    }
  }

  return {
    // === readonly state mutable only using setters ===
    state: readonly(state),
    // === Setters ===
    setCards,
    setWinningCardName,
    // === Methods ===
    loadCards
  }
}
