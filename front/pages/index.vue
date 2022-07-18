<template lang="pug">
v-container(fluid='' fill-height='')
  v-layout(align-center='' justify-center='')
    v-flex(xs12='' sm8='' md4='')
      v-card.mx-auto(max-width='1200')
        v-toolbar(color='indigo' dark='')
          v-toolbar-title Список усіх користувачів
        v-list
          .text-center
            v-progress-circular(v-if="isLoading" :size="30" color="black" indeterminate)
          v-list-item(v-if="!isLoading && !error" v-for='item in items' :key='item._id' @click="$router.push(`/user/${item._id}`)")
            v-list-item-icon
              v-icon(color='pink' v-show="item.admin")
                | mdi-crown
            v-list-item-content
              v-list-item-title(v-text='item.email')
            v-list-item-content
              v-list-item-title(v-text='item.name')
            v-list-item-avatar
              v-avatar(color="indigo")
                v-icon(dark) mdi-account-circle
      v-pagination(:length="total" @input="fetchUsers" v-model="page")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'main',
  data() {
    return {
      isLoading: true,
      error: false,
      items: [],
      total: 0,
      page: 1
    }
  },
  mounted() {
    this.fetchUsers(this.page)
  },
  methods: {
    ...mapActions({ getUsers: 'user/getUsers', deleteUser: 'user/deleteUser' }),
    async fetchUsers(pageNumber) {
      this.isLoading = true;
      try {
        const response = await this.getUsers(pageNumber - 1)
        if (response.status === 200) {
	  this.page = pageNumber
          this.items = response.data.userList
	  this.total = response.data.maxPage
        }
      } catch (err) {
        console.log(err)
        this.error = true
      }
      this.isLoading = false
    },
    async deleteUserProfile(id) {
      try {
        const response = await this.deleteUser(id)
        if (response.status === 200) {
          this.fetchUsers()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
