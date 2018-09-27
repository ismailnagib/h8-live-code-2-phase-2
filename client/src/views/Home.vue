<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <search v-if='islogin'></search>
        </div>
        <div class="col-6">
          <timeline></timeline>
        </div>
        <div class="col-3">
          <whotofollow v-if='islogin'></whotofollow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeline from '@/components/timeline.vue'
import search from '@/components/search.vue'
import whotofollow from '@/components/whotofollow.vue'
import store from '@/store'

export default {
  name: 'home',
  components: {
    timeline,
    search,
    whotofollow
  },
  computed: {
    islogin: function () {
      return this.$store.state.islogin
    }
  }
}
</script>
