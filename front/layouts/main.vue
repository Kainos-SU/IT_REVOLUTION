<template lang="pug">
  v-app
    v-app-bar(app)
      v-btn(@click="logout") Logout
    v-main
      nuxt
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MainLayout',
  methods: {
    ...mapActions({ REMOVE_TOKEN: 'REMOVE_TOKEN' }),
    logout() {
      this.REMOVE_TOKEN()
      this.$router.push("/login");
    }
  }
}
</script>
<style lang="scss"></style>
