<template>
  <div class="card  mb-3" style="max-width: 18rem;">
    <div class="card-body who-to-follow">
      <h5 class="card-title">Who to Follow <small><a href="#" v-on:click='getRandomUser()'>Refresh</a></small></h5>
      <ul id="recently-followed">
        <li v-for='(user, index) in randomUsers' :key='index'>
          <div class="media ">
            <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
            <span class="media-body twit-status">
              <h6 class="mt-0">{{ user.name }} <small>@{{ user.username }}</small></h6>
              <button class="btn btn-outline-info">Follow</button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'whotofollow',
  data: function () {
    return {
      randomUsers: []
    }
  },
  methods: {
    getRandomUser: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/random',
        data: { token: localStorage.getItem('token')}
      })
      .then(data => {
        if (data.data.data.indexOf(null) !== -1) {
          this.getRandomUser()
        } else {
          this.randomUsers = data.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    setTimeout(() => {
      this.getRandomUser()
    }, 1)
  }
}
</script>

<style>

</style>
