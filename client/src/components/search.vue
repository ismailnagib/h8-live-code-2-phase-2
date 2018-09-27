<template>
    <div>
      <div class="card  mb-3" style="max-width: 18rem;">
        <div class="card-body">
          <input type="text" v-model='keyword' placeholder="Search...">
          <button class="btn-info" v-on:click='search()'>Search</button>
        </div>
      </div>
    </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'

export default {
  name: 'search',
  store,
  data: function () {
    return {
      keyword: ''
    }
  },
  methods: {
    search: function () {
      if (this.keyword.length > 0) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/status/search',
          data: { keyword: this.keyword, token: localStorage.getItem('token') }
        })
          .then(data => {
            this.$store.commit('updateAllStatus', data.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios({
          method: 'get',
          url: 'http://localhost:3000/status/'
        })
          .then(data => {
            this.$store.commit('updateAllStatus', data.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    allstatus () {
      return this.$store.state.allstatus
    }
  }
}
</script>

<style>

</style>
