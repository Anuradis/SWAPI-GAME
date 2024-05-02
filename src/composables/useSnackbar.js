import { reactive, readonly } from 'vue'

const state = reactive({
  isVisible: false,
  errorMsg: ''
})

export default function useSnackbar() {
  // === Setters ===
  const setIsVisible = (isVisible) => {
    state.isVisible = isVisible
  }

  const setErrorMsg = (errorMsg) => {
    state.errorMsg = errorMsg
  }

  // === Methods ===
  const onHideSnackbar = () => {
    setIsVisible(false)
    setErrorMsg('')
  }

  const showSnackbar = (errorMsg) => {
    setIsVisible(true)
    setErrorMsg(errorMsg)

    // Native timeout vuetify prop for v-snackbar didn't seem to work
    // Due to scope of task just a quick solution below
    setTimeout(() => {
      setIsVisible(false)
    }, 4000)
  }

  return {
    // === readonly state mutable only using setters ===
    state: readonly(state),
    // === Setters ===
    setIsVisible,
    setErrorMsg,
    // === Methods ===
    onHideSnackbar,
    showSnackbar
  }
}
