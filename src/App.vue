<template>
  <main>
    <router-view></router-view>
    <v-snackbar v-model="snackbar.state.isVisible" color="red-darken-2">
      {{ snackbar.state.errorMsg }}
    </v-snackbar>
  </main>
</template>

<script>
import useSnackbar from './composables/useSnackbar'
export default {
  setup() {
    return {
      snackbar: useSnackbar()
    }
  }
}
</script>
