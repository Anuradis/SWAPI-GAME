<template>
  <v-img
    :src="STAR_WARS_BG.src"
    :alt="STAR_WARS_BG.title"
    cover
    class="overflow"
    :gradient="GRADIENT_DEF"
  >
    <div class="scrollable-container">
      <v-container fluid justify="center" align="center" pa-0>
        <!-- Page title section -->
        <v-row>
          <v-col cols="12 pa-5">
            <h1 class="display-2 text-center text-white">Welcome to the SWAPI Game.</h1>
            <h2 class="display-2 text-center text-white font-weight-light font-italic">
              Are you ready for another battle?
            </h2>
          </v-col>
        </v-row>

        <!-- Signup and login forms -->
        <v-row justify="space-around">
          <v-col cols="10" md="3">
            <h3 class="display-2 text-center text-white pa-2">Login in your existing account</h3>
            <LoginForm @login="user.onLogin" />
          </v-col>
          <v-col cols="10" md="3">
            <h3 class="display-2 text-center text-white pa-2">Don't have an account yet?</h3>
            <p class="display-2 text-center text-white font-weight-thin font-italic pa-1">
              Let's get you all set up so you can start taking place in that great experience
            </p>
            <SignupForm @signup="user.onRegisterAccount" />
          </v-col>
        </v-row>
      </v-container>
      <ResultList :results="firestore.state.results" />
      <v-snackbar v-model="snackbar.state.isVisible" color="red-darken-2">
        {{ snackbar.state.errorMsg }}
      </v-snackbar>
    </div>
  </v-img>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import ResultList from '@/components/ResultList.vue'
import { STAR_WARS_BG, GRADIENT_DEF } from '@/constants/common'
import { useRouter } from 'vue-router'
import useUser from '@/composables/useUser'
import useSnackbar from '@/composables/useSnackbar'
import useFirestore from '@/composables/useFirestore'

export default {
  components: {
    SignupForm,
    LoginForm,
    ResultList
  },
  setup() {
    return {
      router: useRouter(),
      user: useUser(),
      snackbar: useSnackbar(),
      firestore: useFirestore()
    }
  },
  data() {
    return {
      STAR_WARS_BG,
      GRADIENT_DEF
    }
  },
  async mounted() {
    if (this.firestore.state.db) {
      await this.firestore.loadGameResults()
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollable-container {
  height: 100vh;
  overflow: auto;
}

.overflow {
  height: 100vh;
  border: 3px;
  box-sizing: border-box;
}
</style>
