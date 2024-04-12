import { reactive, readonly, computed } from 'vue'
import SwapiService from '@/services/SwapiService'
import { INITIAL_PLAYERS, STARSHIPS_RULES_DEF, PEOPLE_RULES_DEF } from '@/constants/common'
import { generateRandomNumber, getWinningCardIndex } from '@/utils/common'
import useSnackbar from '@/composables/useSnackbar'
import useFirestore from '@/composables/useFirestore'

const state = reactive({
  loading: false,
  cards: [],
  //can't see uid in SWAPI therefore name used
  winningCardIndex: null,
  controlPanel: {
    settingsSaved: false,
    isStarshipRace: false,
    currentGame: {
      player1: {
        nickname: INITIAL_PLAYERS.player1.nickname,
        score: INITIAL_PLAYERS.player1.score
      },
      player2: {
        nickname: INITIAL_PLAYERS.player2.nickname,
        score: INITIAL_PLAYERS.player2.score
      }
    }
  }
})

export default function useGame() {
  // === Composables ===
  const snackbar = useSnackbar()
  const firestore = useFirestore()

  // === Setters ===
  /**
   * Sets fetched and mapped data as cards, order is crucial for scoring sheet
   *
   * @param {String} resourceType - SWAPI resource type
   * @param {Number} firstPlayerCard  - card fetched based on first user random number
   * @param {Number} secondPlayerCard - card fetched based on second user random number
   */
  const setCards = (firstPlayerCard, secondPlayerCard) => {
    state.cards = [firstPlayerCard, secondPlayerCard]
  }

  const setIsStarshipRace = (isStarshipRace) => {
    state.controlPanel.isStarshipRace = isStarshipRace
  }

  const setPlayer1Nickname = (nickname) => {
    state.controlPanel.currentGame.player1.nickname = nickname
  }

  const setPlayer2Nickname = (nickname) => {
    state.controlPanel.currentGame.player2.nickname = nickname
  }

  const setSettingsSaved = (settingsSaved) => {
    state.controlPanel.settingsSaved = settingsSaved
  }

  const clearCurrentGameResult = () => {
    state.controlPanel.currentGame.player1.score = INITIAL_PLAYERS.player1.score
    state.controlPanel.currentGame.player2.score = INITIAL_PLAYERS.player2.score
    state.cards = []
    state.winningCardIndex = -1
  }

  // === Computed
  const resourceTypeRules = computed(() => {
    return state.controlPanel.isStarshipRace ? STARSHIPS_RULES_DEF : PEOPLE_RULES_DEF
  })

  const settingsSaved = computed(() => {
    return state.controlPanel.settingsSaved
  })

  const alreadyPlayed = computed(() => {
    return state.cards.length
  })

  const player1Nickname = computed(() => {
    return state.controlPanel.currentGame.player1.nickname
  })

  const player2Nickname = computed(() => {
    return state.controlPanel.currentGame.player2.nickname
  })

  // === Methos ====

  /**
   * Function updates game result, if winning index -1 there is no winner(draw)
   *
   * @param {Number} winningIndex
   */
  const updateGameResult = (winningIndex) => {
    if (winningIndex === 0) {
      state.controlPanel.currentGame.player1.score += 1
    } else if (winningIndex === 1) {
      state.controlPanel.currentGame.player2.score += 1
    }
    //Draw - no winner
  }

  /**
   * Function loads random cards for players whenever play button used
   *
   * @param {String} resourceType  - SWAPI resource type
   * @param {Number} firstRandomNumber - random number of resource for 1-st player
   * @param {Number} secondRandomNumber  - random number of resource for 2-nd player
   */
  const loadCards = async (resourceType, firstRandomNumber, secondRandomNumber) => {
    try {
      state.loading = true

      const [firstPlayerCard, secondPlayerCard] = await Promise.all([
        SwapiService.fetchSWAPIByResourceType(resourceType, firstRandomNumber),
        SwapiService.fetchSWAPIByResourceType(resourceType, secondRandomNumber)
      ])

      setCards(firstPlayerCard, secondPlayerCard)
    } catch (err) {
      snackbar.showSnackbar(err)
      console.error(err)
    } finally {
      state.loading = false
    }
  }

  const onPlay = async () => {
    const firstRandomNumber = generateRandomNumber(
      resourceTypeRules.value.minNumber,
      resourceTypeRules.value.maxNumber
    )

    const secondRandomNumber = generateRandomNumber(
      resourceTypeRules.value.minNumber,
      resourceTypeRules.value.maxNumber
    )

    await loadCards(resourceTypeRules.value.type, firstRandomNumber, secondRandomNumber)

    state.winningCardIndex = getWinningCardIndex(state.cards, resourceTypeRules.value.compareAttr)

    updateGameResult(state.winningCardIndex)
  }

  const onSave = async () => {
    await firestore.updateGameResults(state.controlPanel.currentGame)
    await firestore.loadGameResults()
    clearCurrentGameResult()
  }

  const onSaveSettings = () => {
    if (settingsSaved.value) {
      setSettingsSaved(false)
    } else {
      setSettingsSaved(true)
    }
  }

  return {
    // === readonly state mutable only using setters ===
    state: readonly(state),
    // === Setters ===
    setCards,
    setIsStarshipRace,
    setPlayer1Nickname,
    setPlayer2Nickname,
    setSettingsSaved,
    clearCurrentGameResult,
    // === Computed ===
    alreadyPlayed,
    resourceTypeRules,
    settingsSaved,
    player1Nickname,
    player2Nickname,
    // === Methods ===
    updateGameResult,
    loadCards,
    onPlay,
    onSave,
    onSaveSettings
  }
}
