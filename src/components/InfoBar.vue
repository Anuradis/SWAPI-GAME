<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-toolbar-title v-if="user.state.isLoggedIn">
        Logged in:
        <span>{{ currentUser }}</span>
        <v-btn @click="user.onSignOut">Logout</v-btn>
      </v-toolbar-title>

      <v-toolbar-items class="pa-5 counter">
        <div class="mr-4">Counter:</div>
        <div class="mr-4">
          {{ game.currentGameResult.player1.nickname }}:
          <span> {{ game.currentGameResult.player1.score }}</span>
        </div>
        <div class="mr-4">
          {{ game.currentGameResult.player2.nickname }}:
          <span> {{ game.currentGameResult.player2.score }}</span>
        </div>
      </v-toolbar-items>
    </v-app-bar>
  </v-layout>
</template>

<script>
import useUser from '@/composables/useUser'
import useGame from '@/composables/useGame'

export default {
  setup() {
    return {
      user: useUser(),
      game: useGame()
    }
  },
  computed: {
    currentUser() {
      return this.user.state.auth.currentUser?.email
    }
  },
  mounted() {}
}
</script>
