import { reactive, readonly } from 'vue'
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
// Composables
import { useRouter } from 'vue-router'
import useSnackbar from '@/composables/useSnackbar'

const state = reactive({
  currentUser: null,
  isLoggedIn: false,
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

  const setIsLoggedIn = (isLoggedIn) => {
    state.isLoggedIn = isLoggedIn
  }

  const setAuth = (auth) => {
    state.auth = auth
    state.currentUser = setCurrentUser(auth?.currentUser || null)
  }

  // === Methods ===

  const onRegisterAccount = async (userData) => {
    try {
      setAuth(getAuth())
      await createUserWithEmailAndPassword(state.auth, userData.email, userData.password)
      setIsLoggedIn(true)
      router.push({ path: 'game' })
    } catch (err) {
      snackbar.showSnackbar(err.code)
    }
  }

  const onLogin = async (userData) => {
    try {
      setAuth(getAuth())
      await signInWithEmailAndPassword(state.auth, userData.email, userData.password)
      setIsLoggedIn(true)

      router.push({ path: 'game' })
    } catch (err) {
      snackbar.showSnackbar(err.code)
    }
  }

  const onSignOut = async () => {
    await signOut(state.auth)
    setIsLoggedIn(false)
    setAuth(null)
    router.push('/')
  }

  return {
    // === State ===
    state: readonly(state),
    // === Setters ===
    setCurrentUser,
    // === Methods ===
    onLogin,
    onSignOut,
    onRegisterAccount
  }
}
