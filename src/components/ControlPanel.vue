<template>
  <v-card height="550" class="custom-card" :color="color" dark>
    <v-card-title>{{ title }}</v-card-title>
    <!-- Settings Fields -->
    <v-card-text>
      <!-- Switch Race Type -->
      <v-switch
        v-model="isStarshipRace"
        :disabled="game.settingsSaved.value"
        :label="'Race Type: ' + (isStarshipRace ? 'Starship' : 'People')"
      ></v-switch>
      <!-- Adding Players -->
      <v-row>
        <v-col
          v-for="(player, index) in players"
          :key="index"
          cols="12"
          class="d-flex align-center"
        >
          <v-text-field
            v-model="player.nickname"
            :disabled="game.settingsSaved.value || game.alreadyPlayed.value"
            label="Player Nickname"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="player1Nickname"
        :disabled="game.settingsSaved.value || game.alreadyPlayed.value"
        label="Player 1 Nickname"
        dense
      ></v-text-field>
      <v-text-field
        v-model="player2Nickname"
        :disabled="game.settingsSaved.value || game.alreadyPlayed.value"
        label="Player 2 Nickname"
        dense
      ></v-text-field>
      <!-- Save Settings Button -->
      <v-btn class="mb-5 mt-5" block @click="game.onSaveSettings">
        {{ game.settingsSaved.value ? 'Edit Settings' : 'Save Settings' }}
      </v-btn>
      <!-- Play Button -->
      <v-btn
        :disabled="!game.settingsSaved.value"
        secondary
        block
        size="x-large"
        @click="game.onPlay"
      >
        {{ game.state.cards.length ? 'Re-match' : 'Play' }}
      </v-btn>
      <!-- Save Button -->
      <v-btn
        class="mb-5 mt-5"
        :disabled="!game.settingsSaved.value || !game.state.cards.length"
        secondary
        block
        @click="game.onSave"
      >
        Publish/New Game
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { SUPPORTED_SWAPI_TYPES, PEOPLE_RULES_DEF, STARSHIPS_RULES_DEF } from '@/constants/common'
import useGame from '@/composables/useGame'

export default {
  setup() {
    return {
      game: useGame()
    }
  },
  data() {
    return {
      SUPPORTED_SWAPI_TYPES,
      PEOPLE_RULES_DEF,
      STARSHIPS_RULES_DEF,
      isStarshipRace: this.game.state.controlPanel.isStarshipRace, // Switch button value for race type (false for 'People', true for 'Starship')
      player1Nickname: this.game.player1Nickname.value,
      player2Nickname: this.game.player2Nickname.value
    }
  },
  watch: {
    isStarshipRace(newVal) {
      this.game.setIsStarshipRace(newVal)
    },
    player1Nickname(newVal) {
      console.log('prayers new val')
      this.game.setPlayer1Nickname(newVal)
    },
    player2Nickname(newVal) {
      this.game.setPlayer2Nickname(newVal)
    }
  }
}
</script>
