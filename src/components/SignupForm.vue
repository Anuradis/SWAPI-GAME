<template>
  <v-card>
    <v-card-title>Sign Up</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="submitForm"
        ><v-text-field
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
          autocomplate="on"
          label="Password"
          type="password"
          required
          :rules="[(v) => !!v || 'Password is required']"
        ></v-text-field>
        <v-text-field
          v-model="formData.confirmPassword"
          autocomplate="on"
          label="Confirm Password"
          type="password"
          required
          :rules="[
            (v) => !!v || 'Confirm Password is required',
            (v) => v === formData.password || 'Password does not match'
          ]"
        ></v-text-field>
        <v-btn type="submit" color="primary">Sign Up</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async submitForm() {
      const isValid = await this.$refs.form.validate()
      if (isValid.valid) {
        this.$emit('signup', this.formData)
      }
    }
  }
}
</script>
