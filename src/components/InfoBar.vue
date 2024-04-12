<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-toolbar-title v-if="user.isLoggedIn.value">
        Logged in:
        <span data-cy="signed-in-user-email">{{ currentUser }}</span>
        <v-btn data-cy="signout" @click="user.onSignOut">Sign out</v-btn>
      </v-toolbar-title>

      <v-toolbar-items class="pa-5 counter">
        <div class="mr-4">Counter:</div>
        <div class="mr-4">
          {{ game.player1Nickname.value }}:
          <span> {{ game.state.controlPanel.currentGame.player1.score }}</span>
        </div>
        <div class="mr-4">
          {{ game.player2Nickname.value }}:
          <span> {{ game.state.controlPanel.currentGame.player2.score }}</span>
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
      return this.user.state.currentUser?.email
    }
  }
}
</script>
