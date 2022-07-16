<template lang="pug">
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
              v-list-item(v-for='item in items' :key='item.title' @click="$router.push(`/user/${item.id}`)")
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: true,
      items: [
        {
          email: '@sfdj.comer',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comoward',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comors',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comker',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comer',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comoward',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comors',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comker',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comer',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comoward',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comors',
          name: 'test',
          id: 1
        },
        {
          email: '@sfdj.comker',
          name: 'test',
          id: 1
        }
      ]
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    ...mapActions({ getUsers: 'user/getUsers' }),
    async fetchUsers() {
      try {
        const response = this.getUsers()
        if (response.status === 200) {
          this.items = response.data
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    }
  }
}
</script>
