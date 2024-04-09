<template>
  <v-img
    :src="starWarsBG"
    cover
    class="overflow"
    gradient="to top right, rgba(0,0,0,.9), rgba(0,0,0,.5)"
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
            <LoginForm @login="onLogin" />
          </v-col>
          <v-col cols="10" md="3">
            <h3 class="display-2 text-center text-white pa-2">Don't have an Account yet?</h3>
            <p class="display-2 text-center text-white font-weight-thin font-italic pa-1">
              Let's get you all set up so you can start taking place in that great experiance
            </p>
            <SignupForm @signup="onSignup" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-img>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import starWarsBG from '@/assets/img/star_wars_bg.jpg'

export default {
  components: {
    SignupForm,
    LoginForm
  },
  methods: {
    onSignup(userData) {
      console.log('User signed up with data:', userData)
    },
    onLogin(userData) {
      console.log('User logged in with data:', userData)
    }
  },
  data() {
    return {
      starWarsBG
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
