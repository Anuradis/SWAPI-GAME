<template>
  <v-card :loading="isLoading" height="550" class="custom-card" :color="cardDetails.color" dark>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <template v-if="cardDetails.resourceType === SUPPORTED_SWAPI_TYPES.people">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>{{ cardDetails.name }}</v-list-item-title>
            <v-list-item-subtitle>Height: {{ cardDetails.height }} cm</v-list-item-subtitle>
            <v-list-item-subtitle>Mass: {{ cardDetails.mass }} kg</v-list-item-subtitle>
            <v-list-item-subtitle>Gender: {{ cardDetails.gender }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
      <template v-else-if="cardDetails.resourceType === SUPPORTED_SWAPI_TYPES.starships">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>{{ cardDetails.name }}</v-list-item-title>
            <v-list-item-subtitle>Crew: {{ cardDetails.crew }}</v-list-item-subtitle>
            <v-list-item-subtitle>Model: {{ cardDetails.model }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >Manufacturer: {{ cardDetails.manufacturer }}</v-list-item-subtitle
            >
            <v-list-item-subtitle>Class: {{ cardDetails.starshipClass }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { SUPPORTED_SWAPI_TYPES } from '@/constants/common'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    cardDetails: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      SUPPORTED_SWAPI_TYPES
    }
  },
}
</script>
