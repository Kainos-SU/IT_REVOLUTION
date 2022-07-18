<template lang="pug">
v-container(fluid='' fill-height='')
  v-layout(align-center='' justify-center='')
    v-col(cols='6')
      v-snackbar(:color='snackbarStatus' top right v-model='showSnackBar')
        span(v-if='snackbarStatus === "success"') User has been deleted
        span(v-else) Error while deleting user
      v-dialog(v-model='deleteDialog' persistent max-width='600px')
        v-card
          v-card-title Deleting User
          v-card-text If you wish to delete this user insert yor password in field below:
            v-form(v-model="valid")
              v-text-field(prepend-icon='mdi-lock' :rules="passwordRules" v-model="adminPassword" label='Password' type='password')
          v-card-actions
            v-btn(color='error' depressed @click='deleteUserProfile' :disabled='!valid') Delete
            v-btn(depressed @click='cancelDeleting') Cancel
      v-card.mx-auto(max-width='1200px')
        v-toolbar(color='indigo' dark='')
          v-toolbar-title Список усіх користувачів
        v-list
          .text-center
            v-progress-circular(v-if="isLoading" :size="30" color="black" indeterminate)
          v-list-item(v-if="!isLoading && !error" v-for='item in items' :key='item._id' @click="$router.push(`/user/${item._id}`)")
            v-list-item-icon(v-if='$store.state.user.currentUser.admin')
              v-btn(icon color='red' @click.stop='callDeleteDialog(item)')
                v-icon
                  | mdi-trash-can-outline
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
      page: 1,
      userToDelete: {},
      snackbarStatus: 'success',
      showSnackBar: false,
      deleteDialog: false,
      adminPassword: '',
      passwordRules: [
        (value) => !!value || 'Password is required',
        (value) => (value && value.length >= 4) || 'minimum 4 characters'
      ],
      valid: true
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
        this.error = true
      }
      this.isLoading = false
    },
    callDeleteDialog(user) {
      this.deleteDialog = true;
      this.userToDelete = user;
    },
    cancelDeleting () {
      this.deleteDialog = false;
      this.userToDelete = {};
      this.adminPassword = "";
    },
    async deleteUserProfile() {
      try {
        const response = await this.deleteUser({id: this.userToDelete._id, adminId: this.$store.state.user.currentUser._id, password: this.adminPassword})
        if (response.status === 200) {
          this.fetchUsers()
          this.snackbarStatus = "success"
        }
      } catch (err) {
        console.log("Error while deleting:\n", err)
        this.snackbarStatus = "error"
      }
      this.showSnackBar = true
      this.userToDelete = null
      this.deleteDialog = false
      this.adminPassword = ""
    }
  }
}
</script>
