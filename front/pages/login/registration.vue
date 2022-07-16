<template lang="pug">
div 
  v-app
    v-content
      v-container(fluid='' fill-height='')
        v-layout(align-center='' justify-center='')
          v-flex(xs12='' sm8='' md4='')
            v-alert(v-model="isError" border="left" fixed top close-text="Close Alert" color="deep-purple accent-4" dark dismissible)
              span Такий користувач уже існує
            v-card.elevation-12
              v-toolbar(dark='' color='primary')
                v-toolbar-title Registration form
              v-card-text
                v-form(v-model="valid")
                  v-text-field(prepend-icon='mdi-emoticon-happy-outline' :rules="rules"  v-model="payload.name" label='Name' type='text')
                  v-text-field(prepend-icon='mdi-emoticon-happy-outline' :rules="emailRules" v-model="payload.email" label='Email' type='text')
                  v-text-field(prepend-icon='mdi-download-lock' :rules="passwordRules"  v-model="payload.password" label='Password' type='password')
              v-card-actions
                v-btn(color='white' to='/login') Login
                v-spacer
                v-btn(color='primary' :disabled="!valid" @click="submitForm" :loading="isLoading") Registration
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  layout: 'basic',
  middleware({ route, store, redirect }) {
    if (store.state.accessToken) {
      return redirect('/')
    } else if (!route.query) {
      return redirect('/login')
    }
  },
  data() {
    return {
      isError: false,
      isLoading: false,
      valid: true,
      passwordRules: [
        (value) => !!value || 'Password is required',
        (value) => (value && value.length >= 4) || 'minimum 4 characters'
      ],
      emailRules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+/.test(value) || 'E-mail must be valid'
      ],
      rules: [(value) => !!value || 'E-mail is required'],
      payload: {
        email: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    ...mapActions({ registration: 'auth/registration', login: 'auth/login' }),
    async submitForm() {
      this.isError = false
      this.isLoading = true
      try {
        const response = await this.registration(this.payload)
        if (response.status === 201) {
          this.loginUser({
            email: this.payload.email,
            password: this.payload.password
          })
        }
      } catch (err) {
        console.log(err)
        this.isError = true
      }
    },
    async loginUser(data) {
      try {
        const response = await this.login(data)
        if (response.status === 200) {
          const token = response.data.token
          this.$store.commit('SET_TOKEN', token)
          this.$cookies.set('token', token)
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
