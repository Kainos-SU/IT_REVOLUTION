<template lang="pug">
<<<<<<< HEAD
  div 
    v-container(fluid='' fill-height='')
      v-layout(align-center='' justify-center='')
        v-flex(xs12='' sm8='' md4='')
          v-card.mx-auto(max-width='1200')
            v-toolbar(color='indigo' dark='')
              v-toolbar-title Список усіх користувачів
            v-list
              .text-center
                v-progress-circular(v-if="isLoading" :size="30" color="black" indeterminate)
              v-list-item(v-for='item in items' :key='item.title')
                v-list-item-icon
                  v-icon(title="Видалити" @click="deleteUserProfile(item._id)")
                    | mdi-trash-can-outline
                v-list-item(@click="$router.push(`/user/${item._id}`)")
                  v-list-item-icon
                    v-icon(color='pink')
                      | mdi-star
                  v-list-item-content
                    v-list-item-title(v-text='item.email')
                  v-list-item-content
                    v-list-item-title(v-text='item.name')
                  v-list-item-avatar
                    v-avatar(color="indigo")
                      v-icon(dark) mdi-account-circle
=======
  v-container(fluid='' fill-height='')
    v-layout(align-center='' justify-center='')
      v-flex(xs12='' sm8='' md4='')
        v-card.mx-auto(max-width='1200')
          v-toolbar(color='indigo' dark='')
            v-toolbar-title Список усіх користувачів
          v-list
            .text-center
              v-progress-circular(v-if="isLoading" :size="30" color="black" indeterminate)
            v-list-item(v-for='item in items' :key='item._id' @click="$router.push(`/user/${item._id}`)")
              v-list-item-icon
                v-icon(color='pink')
                  | mdi-star
              v-list-item-content
                v-list-item-title(v-text='item.email')
              v-list-item-content
                v-list-item-title(v-text='item.name')
              v-list-item-avatar
                v-avatar(color="indigo")
                  v-icon(dark) mdi-account-circle
>>>>>>> styling
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'main',
  data() {
    return {
      isLoading: true,
<<<<<<< HEAD
      items: []
=======
      error: false,
      items: [],
>>>>>>> styling
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    ...mapActions({ getUsers: 'user/getUsers', deleteUser: 'user/deleteUser' }),
    async fetchUsers() {
      try {
        const response = await this.getUsers()
<<<<<<< HEAD
=======
        console.log(response.data.newUserList);
>>>>>>> styling
        if (response.status === 200) {
          this.items = response.data.newUserList
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
