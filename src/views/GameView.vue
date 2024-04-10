<template>
  <v-img
    :src="STAR_WARS_BG.src"
    :title="STAR_WARS_BG.title"
    cover
    class="overflow"
    gradient="to top right, rgba(0,0,0,.9), rgba(0,0,0,.5)"
  >
    <InfoBar></InfoBar>
    <div class="scrollable-container pa-16">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="4" :key="index">
            <SettingsCard
              :isLoading="game.state.loading"
              :title="SETTINGS_CARD.title"
              :color="SETTINGS_CARD.color"
            />
          </v-col>

          <v-col cols="12" md="4" v-for="(card, index) in game.state.cards" :key="index">
            <SwapiCard :title="index === 0 ? 'Player1' : 'Player2'" :cardDetails="card" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-img>
</template>

<script>
import SwapiCard from '@/components/SwapiCard.vue'
import InfoBar from '@/components/InfoBar.vue'
import SettingsCard from '@/components/SettingsCard.vue'
import useGame from '@/composables/useGame'
import { STAR_WARS_BG, SETTINGS_CARD } from '@/constants/common'

export default {
  components: {
    InfoBar,
    SettingsCard,
    SwapiCard
  },
  methods: {},
  setup() {
    return {
      game: useGame()
    }
  },
  data() {
    return {
      STAR_WARS_BG,
      SETTINGS_CARD
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollable-container {
  height: 100vh;
  overflow: auto;
}
</style>
