import { reactive, onMounted } from 'vue'
import {
  onAuthStateChanged,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
// Composables
import { useRouter } from 'vue-router'
import useSnackbar from '@/composables/useSnackbar.js'

const state = reactive({
  currentUser: null,
  isLoggedIn: false,
  auth: null
})

export default function useUser() {
  // === Composables ===
  const router = useRouter()
  const snackbar = useSnackbar()

  onMounted(() => {
    setAuth(getAuth())
    onAuthStateChanged(state.auth, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false)
    })
  })

  // === Setters ===
  const setCurrentUser = (currentUser) => {
    state.currentUser = currentUser
  }

  const setIsLoggedIn = (isLoggedIn) => {
    state.isLoggedIn = isLoggedIn
  }

  const setAuth = (auth) => {
    state.auth = auth
  }

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
    console.log(userData, 'userData')
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, userData.email, userData.password)
      router.push({ path: 'game' })
    } catch (err) {
      console.log(err, 'err before show snackbar')
      snackbar.showSnackbar(err.code)
    }
  }

  const onSignOut = async () => {
    console.log('on signOut executed')
    await signOut(state.auth)
    router.push('/')
  }

  return {
    // === State ===
    state,
    // === Setters ===
    setCurrentUser,
    // === Methods ===
    onLogin,
    onSignOut,
    onRegisterAccount
  }
}
