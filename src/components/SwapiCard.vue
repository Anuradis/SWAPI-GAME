<template>
  <v-card class="custom-card" :color="color" dark>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <template v-if="type === 'people'">
        <v-list dense>
          <v-list-item v-for="(item, index) in details" :key="index">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>Height: {{ item.height }} cm</v-list-item-subtitle>
            <v-list-item-subtitle>Mass: {{ item.mass }} kg</v-list-item-subtitle>
            <v-list-item-subtitle>Gender: {{ item.gender }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
      <template v-else-if="type === 'starships'">
        <v-list dense>
          <v-list-item v-for="(item, index) in details" :key="index">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>Model: {{ item.model }}</v-list-item-subtitle>
            <v-list-item-subtitle>Manufacturer: {{ item.manufacturer }}</v-list-item-subtitle>
            <v-list-item-subtitle>Class: {{ item.starship_class }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    details: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style scoped>
.custom-card {
  margin-bottom: 20px;
}
</style>
