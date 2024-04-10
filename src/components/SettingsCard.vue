<template>
  <v-card height="550" class="custom-card" :color="color" dark>
    <v-card-title>{{ title }}</v-card-title>
    <!-- Settings Fields -->
    <v-card-text>
      <!-- Switch Race Type -->
      <v-switch
        v-model="isStarshipRace"
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
          <v-text-field v-model="player.nickname" label="Player Nickname" dense></v-text-field>
          <v-btn @click="removePlayer(index)" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col v-if="players.length < 2" class="d-flex align-center">
          <v-text-field v-model="playerNickname" label="Player Nickname" dense></v-text-field>
          <v-btn
            :variant="text"
            icon="mdi-plus"
            size="small"
            @click="addPlayer"
            :disabled="!playerNickname.trim()"
          >
          </v-btn>
        </v-col>
      </v-row>

      <!-- Random Hash Input Field -->
      <v-text-field v-model="randomHash" label="Random Hash" dense></v-text-field>

      <!-- Save Settings Button -->
      <v-btn
        class="mb-3"
        block
        @click="saveSettings"
        :disabled="!selectedRaceType || players.length < 1 || !randomHash"
        >Save Settings
      </v-btn>

      <v-btn color="secondary" block size="x-large" @click="onPlay"> Play </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import useGame from '@/composables/useGame'
import { getRandomNumber } from '@/utils/common'
import { SUPPORTED_SWAPI_TYPES, PEOPLE_RULES_DEF, STARSHIPS_RULES_DEF } from '@/constants/common'

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
      details: [], // Example details data
      isStarshipRace: false, // Switch button value for race type (false for 'People', true for 'Starship')
      players: [{ nickname: 'player1' }], // Array to hold player data
      playerNickname: '', // Input field for player nickname
      randomHash: '' // Input field for random hash
    }
  },
  methods: {
    addPlayer() {
      if (this.players.length < 2 && this.playerNickname.trim()) {
        this.players.push({ nickname: this.playerNickname.trim() })
        this.playerNickname = '' // Clear input after adding player
      }
    },
    removePlayer(index) {
      this.players.splice(index, 1)
    },
    saveSettings() {
      // Implement logic to save settings here
      console.log('Selected Race Type:', this.isStarshipRace)
      console.log('Players:', this.players)
      console.log('Random Hashes:', this.randomHash)
    },
    onPlay() {
      console.log(this.randomHash, 'random hash')
      console.log(this.players, 'players')
      console.log(this.isStarshipRace, 'reca type')
      console.log(this.resourceTypeRules, 'resourceTypeRules')
      const firstRandomNumber = getRandomNumber(
        this.randomHash,
        this.resourceTypeRules.minNumber,
        this.resourceTypeRules.maxNumber
      )

      const secondRandomNumber = getRandomNumber(
        `${[...this.randomHash].reverse().join('')}`,
        this.resourceTypeRules.minNumber,
        this.resourceTypeRules.maxNumber
      )

      this.game.loadCards(this.resourceTypeRules.type, firstRandomNumber, secondRandomNumber)
    }
  },
  computed: {
    resourceTypeRules() {
      return this.isStarshipRace ? this.STARSHIPS_RULES_DEF : this.PEOPLE_RULES_DEF
    }
  }
}
</script>
