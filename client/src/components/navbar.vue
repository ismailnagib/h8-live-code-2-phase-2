<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Victwitter</a>
      <div class="header-right">
        <div v-if='islogin === false'>
          <div id='notice'>{{ notice }}</div>
          <input type="text" v-model='user' placeholder="username / email">
          <input type="password" v-model='password' placeholder="password">
          <button class="btn-info" v-on:click='login()'>Login</button>
        </div>
        <div v-else>
          <button class="btn-info" v-on:click='logout()'>Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from '@/store'
import mapState from 'vuex'
import axios from 'axios'

export default {
  name: 'navbar',
  store,
  data: function () {
    return {
      user: '',
      password: '',
      notice: ''
    }
  },
  methods: {
    login () {
      if (this.user.length > 0 && this.password.length > 0) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: { user: this.user, password: this.password }
        })
          .then(data => {
            localStorage.setItem('token', data.data.token)
            this.$store.commit('login')
          })
          .catch(err => {
            console.log(err)
            this.notice = 'wrong email or password'
          })
      }
    },
    logout () {
      this.$store.commit('logout')
      localStorage.clear()
    },
    checkLogin () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/checklogin',
        data: { token: localStorage.getItem('token') }
      })
      .then(data => {
        if (data.data.isLogin) {
          this.$store.commit('login')
        } else {
          this.$store.commit('logout')
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    islogin () {
      return this.$store.state.islogin
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.checkLogin()
    }
  }
}
</script>

<style>
  #notice {
    color: red
  }
</style>
