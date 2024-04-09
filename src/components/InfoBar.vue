<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-toolbar-title
        >Logged in: <span>Roniek Ronialski</span> <v-btn>Logout</v-btn></v-toolbar-title
      >

      <v-toolbar-items class="pa-5 counter">
        <div class="mr-4">Counter:</div>
        <div class="mr-4">Player 1: <span>2</span></div>
        <div class="mr-4">Player 2: <span>65</span></div>
      </v-toolbar-items>
    </v-app-bar>
  </v-layout>
</template>

<script>
export default {
  setup() {
    return {
      // initialize useUser composable
    }
  }
}
</script>
