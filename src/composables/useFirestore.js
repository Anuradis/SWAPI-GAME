import { reactive, readonly } from 'vue'
import FirebaseService from '@/services/FirebaseService'
import GameResult from '@/models/GameResult'
import useSnackbar from '@/composables/useSnackbar'
const state = reactive({
  db: null,
  collectionRef: null,
  results: []
})

export default function useFirestore() {
  // === Composables ===
  const snackbar = useSnackbar()

  // === Setters ===
  const setDB = (db) => {
    state.db = db
  }

  // === Methods ===
  const loadGameResults = async () => {
    try {
      state.results = await FirebaseService.fetchGameResults(state.db)
    } catch (err) {
      snackbar.showSnackbar(err)
      console.error(err)
    }
  }

  //Todo continue here
  const updateGameResults = async (payload) => {
    try {
      const parsedPayload = GameResult.toAPI(payload)
      await FirebaseService.updateResultsCollection(state.db, parsedPayload)
    } catch (err) {
      snackbar.showSnackbar(err)
      console.error(err)
    }
  }

  return {
    // === readonly state mutable only using setters ===
    state: readonly(state),
    // === Setters ===
    setDB,
    // === Methods
    loadGameResults,
    updateGameResults
  }
}
