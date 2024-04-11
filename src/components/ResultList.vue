<template>
  <v-col>
    <v-table height="230px" theme="dark" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Player 1</th>
          <th class="text-left">P1 Score</th>
          <th class="text-left">Player 2</th>
          <th class="text-left">P2 Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.player1.name">
          <td>{{ result.player1.name }}</td>
          <td>{{ result.player1.score }}</td>
          <td>{{ result.player2.name }}</td>
          <td>{{ result.player2.score }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log(this.results, 'results')
  }
}
</script>
