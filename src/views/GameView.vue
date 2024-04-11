<template>
  <v-img
    :src="STAR_WARS_BG.src"
    :title="STAR_WARS_BG.title"
    cover
    class="overflow"
    gradient="to top right, rgba(0,0,0,.9), rgba(0,0,0,.5)"
  >
    <InfoBar />
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
      <ResultList :results="results" />
    </div>
  </v-img>
</template>

<script>
import SwapiCard from '@/components/SwapiCard.vue'
import InfoBar from '@/components/InfoBar.vue'
import SettingsCard from '@/components/SettingsCard.vue'
import ResultList from '@/components/ResultList.vue'
import useGame from '@/composables/useGame'
import { STAR_WARS_BG, SETTINGS_CARD } from '@/constants/common'
import useFirestore from '@/composables/useFirestore'

export default {
  components: {
    InfoBar,
    SettingsCard,
    SwapiCard,
    ResultList
  },
  methods: {},
  setup() {
    return {
      game: useGame(),
      firestore: useFirestore()
    }
  },
  data() {
    return {
      STAR_WARS_BG,
      SETTINGS_CARD,
      results: []
    }
  },
  async mounted() {
    if (!this.firestore.state.results.length) {
      await this.firestore.loadGameResults()
    }
    this.results = this.firestore.state.results
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
