<template>
  <div>
    <div class="row" v-for='(status, index) in allstatus' :key='index'>
      <div class="col-lg-12 col-md-12 timeline-wrapper">
        <div class="media ">
        <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
        <span class="media-body twit-status">
            <h5 class="mt-0">{{ status.author.name }}</h5>
            <p>@{{ status.author.username }}</p>
            {{ status.content }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import mapState from 'vuex'
import axios from 'axios'

export default {
  name: 'timeline',
  store,
  methods: {
    getAllStatus: function () {
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
  },
  computed: {
    allstatus () {
      return this.$store.state.allstatus
    }
  },
  created () {
    this.getAllStatus()
  }
}
</script>

<style>

</style>
