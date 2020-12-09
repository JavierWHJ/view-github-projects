<template>
  <div class="container mt-5">
    <div class="row justify-content-md-center">
      <div class="col col-lg-2"></div>
      <div class="col-md-auto mb-3">
        <h1>Github Username</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(searchUser)">
            <validation-provider rules="required|alpha_num" v-slot="{ errors, classes }" :bails="false">
            <div class="input-group mb-3" :class="classes" >
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">@</span>
              </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="javierwhj"
                  v-model="searchQuery"
                />
                <div class="input-group-append">
                  <button class="btn btn-secondary" type="submit">Search</button>
                </div>
            </div>
            <div class="alert alert-warning" role="alert" v-if="errors.length">
              {{ errors[0] }}
            </div>
            </validation-provider>
          </form>
        </ValidationObserver>
      </div>
      <div class="col col-lg-2"></div>
    </div>
    <!-- row -->

    <div class="row">
      <div class="col align-self-center">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-if="loading">
            <div class="spinner-border" role="status" >
            </div>
          </div>

          <router-link
            :to="'/projects/' + user.login"
            class="list-group-item list-group-item-action"
            v-for="(user, userIndex) in userData"
            :key="userIndex"
          >
            <div class="float-left avatar">
              <img :src="user.avatar_url" class="align-self-start mr-3" :alt="user.login" />
            </div>
            <div class="userlist float-left">
              <h3 class="mt-0 mb-1">{{ user.login }}</h3>
            </div>
          </router-link>

        </div>
      </div>
    </div>
  </div>
  <!-- container -->
</template>

<script>
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, alpha_num } from 'vee-validate/dist/rules'
import { searchUser } from '../api/github'

extend('required', {
  ...required,
  message: 'Please Enter Github Username'
})
extend('alpha_num', {
  // eslint-disable-next-line camelcase
  ...alpha_num,
  message: 'No Special Characters Required'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: 'is-dirty'
  }
})

export default {
  name: 'Home',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      searchQuery: '',
      userData: [],
      loading: false
    }
  },
  methods: {
    async searchUser () {
      try {
        this.loading = true
        const response = await searchUser(this.searchQuery)
        this.userData = response.data.items

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.avatar img{
    width: 50px;
}
.float-right {
  float:right
}
.float-left {
  float:left
}
.userlist h3 {
  line-height: 46px
}
.is-dirty, .is-invalid {
  border: 1px rgb(131, 0, 0) solid;
  border-radius: 5px;
}
.is-valid {
  border: 1px rgb(0, 121, 0) solid;
}
</style>
