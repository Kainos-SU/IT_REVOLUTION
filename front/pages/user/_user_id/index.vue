<template lang="pug">
div 
  v-card.mx-auto(max-width='1000' tile='')
    v-img(height='200' src='https://steamuserimages-a.akamaihd.net/ugc/938320481065434302/A064FE099954A915A0A3DB3BD8046FC0AFFD6D9C/')
    v-row(style='margin:2.5%;position:absolute; top: 130px')
      v-list-item
        v-list-item-avatar(size='100')
          img(src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' :alt='userData.name')
        v-list-item-content
          v-list-item-title.title(style='margin-top:20px;')
            | {{
            | userData.name
            | }}
          v-list-item-subtitle {{ userData.email }}
          
    <td style="position:absolute; left:-450px;top:0px">
      v-img(src='https://materials.basov.com.ua/images/ukrainian-ornament-black-red-vector-illustration461x461.jpg?crc=4239809672')
      v-img(src='https://materials.basov.com.ua/images/ukrainian-ornament-black-red-vector-illustration461x461.jpg?crc=4239809672')
    </td>
    <td style="position:absolute; right:-450px;top:0px">
      v-img(src='https://materials.basov.com.ua/images/ukrainian-ornament-black-red-vector-illustration461x461.jpg?crc=4239809672')
      v-img(src='https://materials.basov.com.ua/images/ukrainian-ornament-black-red-vector-illustration461x461.jpg?crc=4239809672')
    </td>
    
  //v-list(dense width="200px" class="mx-auto")
  //  v-list-item-content {{userData.email}}
  //  v-list-item-content {{userData.name}}
  //  v-list-item-content {{userData.admin ? "Is Admin" : "No Admin"}}

    
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: true,
      userData: {}
    }
  },
  mounted() {
    const id = this.$route.params.user_id
    if (id) {
      this.fetchUserData(id)
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions({ getUserById: 'user/getUserById' }),
    async fetchUserData(id) {
      try {
        const response = await this.getUserById(id)
        if (response.status === 200) {
          this.userData = response.data.user
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    }
  }
}
</script>
