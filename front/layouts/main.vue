<template lang="pug">
v-app
  v-app-bar(app tile class="px-6")
    v-toolbar-title User List App
    v-spacer
    v-menu(bottom min-width="200px" rounded offset-y nudge-bottom="10")
      template(v-slot:activator="{ on }")
        v-btn(icon x-large v-on="on")
          v-avatar(color="indigo" size="48")
            v-icon(dark) mdi-account-circle
      v-card 
        v-list-item-content.justify-center
          div(class="mx-auto text-center")
            v-avatar(color="indigo")
              v-icon(dark) mdi-account-circle
            h3.mt-5 {{ $store.state.user.currentUser.name }}
            p(class="text-caption mt-1") {{ $store.state.user.currentUser.email }}
            v-divider(class="my-3")
            v-btn(depressed text @click='goToAccountDetails') Account Details 
            v-divider(class="my-3")
            v-btn(depressed text @click="logoutUser")
              v-icon(class="mr-2") mdi-logout
              | Logout
  v-main
    nuxt
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MainLayout',
  data() {
    return {
      user: {
        email: '',
        fullName: ''
      }
    }
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    async logoutUser() {
      try {
        const params = {
          _id:
            this.$store.state.user &&
            this.$store.state.user.currentUser &&
            this.$store.state.user.currentUser._id,
          token: this.$store.state.accessToken
        }
        await this.logout(params)
      } catch (err) {
        console.log(err)
      }
      this.$store.commit('SET_TOKEN', null)
      this.$cookies.remove('token')
      this.$router.push('/login')
    },
    goToAccountDetails() {
      this.$router.push(`/user/${this.$store.state.user.currentUser._id}`)
    }
  }
}
</script>
<style lang="scss"></style>
