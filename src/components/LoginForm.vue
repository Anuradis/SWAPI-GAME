<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.email"
          label="Email"
          type="email"
          required
          :rules="[
            (v) => !!v || 'Email is required',
            (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
          ]"
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          required
          :rules="[(v) => !!v || 'Password is required']"
        ></v-text-field>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$emit('login', this.formData)
      }
    }
  }
}
</script>
