<template>
  <v-card :loading="isLoading" height="550" class="custom-card" :color="cardDetails.color" dark>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <template v-if="cardDetails.resourceType === SUPPORTED_SWAPI_TYPES.people">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>{{ cardDetails.name }}</v-list-item-title>
            <v-list-item-subtitle>Type: {{ cardDetails.resourceType }}</v-list-item-subtitle>
            <v-list-item-subtitle>Height: {{ cardDetails.height }} cm</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-bold"
              >Mass: {{ cardDetails.mass }} kg</v-list-item-subtitle
            >
            <v-list-item-subtitle>Gender: {{ cardDetails.gender }}</v-list-item-subtitle>
            <v-list-item-subtitle>Birth Year: {{ cardDetails.birthYear }}</v-list-item-subtitle>
            <v-list-item-subtitle>Eye Color: {{ cardDetails.eyeColor }}</v-list-item-subtitle>
            <v-list-item-subtitle>Skin Color: {{ cardDetails.skinColor }}</v-list-item-subtitle>
            <v-list-item-subtitle>Hair Color: {{ cardDetails.hairColor }}</v-list-item-subtitle>
            <v-list-item-subtitle>Gender: {{ cardDetails.gender }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
      <template v-else-if="cardDetails.resourceType === SUPPORTED_SWAPI_TYPES.starships">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>{{ cardDetails.name }}</v-list-item-title>
            <v-list-item-subtitle>Type: {{ cardDetails.resourceType }}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-bold"
              >Crew: {{ cardDetails.crew }}</v-list-item-subtitle
            >
            <v-list-item-subtitle>Model: {{ cardDetails.model }}</v-list-item-subtitle>
            <v-list-item-subtitle>Passengers: {{ cardDetails.passengers }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >Manufacturer: {{ cardDetails.manufacturer }}</v-list-item-subtitle
            >
            <v-list-item-subtitle>Class: {{ cardDetails.starshipClass }}</v-list-item-subtitle>
            <v-list-item-subtitle>Consumables: {{ cardDetails.consumables }}</v-list-item-subtitle>
            <v-list-item-subtitle> Length: {{ cardDetails.length }} </v-list-item-subtitle>
            <v-list-item-subtitle
              >Cargo Capacity: {{ cardDetails.cargoCapacity }}</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </template>
    </v-card-text>
    <v-img
      v-if="winner"
      height="250"
      :src="STAR_WARS_WINNER.src"
      :alt="STAR_WARS_WINNER.title"
      cover
    ></v-img>
  </v-card>
</template>

<script>
import { SUPPORTED_SWAPI_TYPES, STAR_WARS_WINNER } from '@/constants/common'

export default {
  data() {
    return {
      SUPPORTED_SWAPI_TYPES,
      STAR_WARS_WINNER
    }
  },
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
    },
    winner: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
