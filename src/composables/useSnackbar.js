import { reactive, readonly } from 'vue'

const state = reactive({
  isVisible: false,
  errorMsg: ''
})

export default function use() {
  // === Composables ===
  //   const router = useRouter()

  // === Setters ===
  const setIsVisible = (isVisible) => {
    state.isVisible = isVisible
    console.log(state, 'state')
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

    // setTimeout(() => {
    //   setIsVisible(false)
    //   setErrorMsg('')
    // }, 4000)
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
