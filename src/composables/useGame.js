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
    players: INITIAL_PLAYERS,
    playerNickname: ''
  }
})

const currentGameResult = reactive({
  player1: {
    nickname: state.controlPanel.players[0].nickname,
    score: 0
  },
  player2: {
    nickname: state.controlPanel.players[1].nickname,
    score: 0
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

  const setIsStarshipRace = (isStarshipRace) => {
    state.controlPanel.isStarshipRace = isStarshipRace
  }

  const setPlayers = (players) => {
    state.controlPanel.players = players
  }

  const setPlayerNickname = (playerNickname) => {
    state.controlPanel.playerNickname = playerNickname
  }

  const setSettingsSaved = (settingsSaved) => {
    state.controlPanel.settingsSaved = settingsSaved
  }

  const clearCurrentResult = () => {
    currentGameResult.player1.score = 0
    currentGameResult.player2.score = 0
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

  // === Methos ====
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

  /**
   * Function updates game result, if winning index -1 there is no winner(draw)
   *
   * @param {winningIndex} Number
   */
  const updateGameResult = (winningIndex) => {
    if (winningIndex === 0) {
      currentGameResult.player1.score += 1
    } else if (winningIndex === 1) {
      currentGameResult.player2.score += 1
    } else {
      //Todo show confirmation on draw
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
    await firestore.updateGameResults(currentGameResult)
    await firestore.loadGameResults()
    clearCurrentResult()
  }

  const onSaveSettings = () => {
    if (settingsSaved.value) {
      setSettingsSaved(false)
    } else {
      setSettingsSaved(true)
    }

    console.log(state.controlPanel.settingsSaved, 'settings saved')
    // Implement logic to save settings here
  }

  const onAddPlayer = () => {
    if (state.controlPanel.players.length < 2 && state.controlPanel.playerNickname.trim()) {
      state.controlPanel.players.push({ nickname: state.controlPanel.playerNickname.trim() })
      state.controlPanel.playerNickname = '' // Clear input after adding player
    }
  }

  const onRemovePlayer = (index) => {
    state.controlPanel.players.splice(index, 1)
  }

  return {
    // === readonly state mutable only using setters ===
    state: readonly(state),
    currentGameResult,
    // === Setters ===
    setCards,
    setWinningCardName,
    setIsStarshipRace,
    setPlayers,
    setPlayerNickname,
    setSettingsSaved,
    clearCurrentResult,
    // === Computed ===
    alreadyPlayed,
    resourceTypeRules,
    settingsSaved,
    // === Methods ===
    loadCards,
    onPlay,
    onSave,
    onSaveSettings,
    onAddPlayer,
    onRemovePlayer
  }
}
