import { reactive, readonly } from 'vue'
import FirebaseService from '@/services/FirebaseService'
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

  const loadGameResults = async () => {
    try {
      state.results = await FirebaseService.fetchGameResults(state.db)
    } catch (err) {
      snackbar.showSnackbar(err)
    }
  }

  return {
    // === readonly state mutable only using setters ===
    state: readonly(state),
    // === Setters ===
    setDB,
    // === Methods
    loadGameResults
  }
}
