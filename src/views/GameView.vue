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
        <v-row justify="center ">
          <v-col cols="12" sm="6" md="4" v-for="(item, index) in items" :key="index">
            <SwapiCard
              :title="item.title"
              :type="item.type"
              :data="item.data"
              :color="item.color"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-img>
</template>

<script>
import SwapiCard from '@/components/SwapiCard.vue'
import InfoBar from '@/components/InfoBar.vue'
import { STAR_WARS_BG } from '@/constants/common.js'

export default {
  components: {
    SwapiCard,
    InfoBar
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
      STAR_WARS_BG,
      items: [
        {
          title: 'People',
          type: 'people',
          data: [],
          color: 'primary'
        },
        {
          title: 'Starships',
          type: 'starships',
          data: [],
          color: 'secondary'
        }
      ]
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
