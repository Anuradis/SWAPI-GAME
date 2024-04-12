import { reactive, readonly, computed } from 'vue'
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

  const setAuth = (auth) => {
    state.auth = auth
    state.currentUser = setCurrentUser(auth?.currentUser || null)
  }

  const isLoggedIn = computed(() => {
    return !!state.currentUser
  })

  // === Methods ===

  const onRegisterAccount = async (userData) => {
    try {
      setAuth(getAuth())
      await createUserWithEmailAndPassword(state.auth, userData.email, userData.password)
      router.push({ path: 'game' })
    } catch (err) {
      snackbar.showSnackbar(err.code)
    }
  }

  const onLogin = async (userData) => {
    try {
      setAuth(getAuth())
      await signInWithEmailAndPassword(state.auth, userData.email, userData.password)

      router.push({ path: 'game' })
    } catch (err) {
      snackbar.showSnackbar(err.code)
    }
  }

  const onSignOut = async () => {
    await signOut(state.auth)
    setAuth(null)
    router.push('/')
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
    onRegisterAccount
  }
}
