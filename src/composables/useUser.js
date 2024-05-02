import { reactive, readonly, computed } from 'vue'
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
// Composables
import { useRouter } from 'vue-router'
import useSnackbar from '@/composables/useSnackbar'

const state = reactive({
  currentUser: null,
  auth: null
})

export default function useUser() {
  // === Composables ===
  const router = useRouter()
  const snackbar = useSnackbar()

  // === Setters ===
  const setCurrentUser = (currentUser) => {
    state.currentUser = currentUser
  }

  const isLoggedIn = computed(() => {
    return !!state.currentUser
  })

  // === Methods ===

  const onRegisterAccount = async (userData) => {
    try {
      await createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
      router.push({ path: 'game' })
    } catch (err) {
      snackbar.showSnackbar(err.code)
    }
  }

  const onLogin = async (userData) => {
    try {
      await signInWithEmailAndPassword(getAuth(), userData.email, userData.password)

      router.push({ path: 'game' })
    } catch (err) {
      snackbar.showSnackbar(err.code)
    }
  }

  const onSignOut = async () => {
    await signOut(getAuth())
    router.push('/')
  }

  /**
   * Function needed in router as  if route visited directly auth wasn't available
   * needed to remove old listener and resolve user
   *
   */
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener()
          resolve(user)
        },
        reject
      )
    })
  }

  return {
    // === State ===
    state: readonly(state),
    // === Setters ===
    setCurrentUser,
    // === Computed ===
    isLoggedIn,
    // === Methods ===
    onLogin,
    onSignOut,
    onRegisterAccount,
    getCurrentUser
  }
}
