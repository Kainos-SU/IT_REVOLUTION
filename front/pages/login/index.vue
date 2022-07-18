<template lang="pug">
v-container(fluid='' fill-height='')
  v-layout(align-center='' justify-center='')
    v-flex(xs12='' sm8='' md4='')
      v-alert(v-model="isError" border="left" close-text="Close Alert" color="deep-purple accent-4" dark dismissible)
        span Неправильний Email або пароль
      v-card.elevation-12
        v-toolbar(dark='' color='primary')
          v-toolbar-title Login form
        v-card-text
          v-form(v-model="valid" @submit="submitForm")
            v-text-field(prepend-icon='mdi-email'  :rules="emailRules" v-model="payload.email" label='Email' type='text')
            v-text-field(prepend-icon='mdi-lock'  v-model="payload.password" :rules="passwordRules" label='Password' type='password')
        v-card-actions
          v-btn(color='white' to='/login/registration') Registration
          v-spacer
          v-btn(color='primary' :disabled="!valid" @click="submitForm" :loading="isLoading") Login
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  middleware({ route, store, redirect }) {
    if (store.state.accessToken) {
      return redirect('/')
    } else if (!route.query) {
      return redirect('/login')
    }
  },
  data() {
    return {
      valid: true,
      isLoading: false,
      isError: false,
      passwordRules: [
        (value) => !!value || 'Password is required',
        (value) => (value && value.length >= 4) || 'minimum 4 characters'
      ],
      emailRules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+/.test(value) || 'E-mail must be valid'
      ],
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({ login: 'auth/login', getCurrentUser: "user/getCurrentUser" }),
    async submitForm() {
      this.isLoading = true
      this.isError = false
      try {
        const response = await this.login(this.payload)
        if (response.status === 200) {
          const token = response.data.token
          const id = response.data._id
          this.$store.commit('SET_TOKEN', token)
          this.$cookies.set('token', token)
          await this.getCurrentUser(id)
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
        this.isError = true
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss"></style>
