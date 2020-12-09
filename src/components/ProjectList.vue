<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col col-lg-2"></div>
      <div class="col-md-auto mt-5">
        <h1>@{{this.$route.params.user}} Projects</h1>
      </div>
      <div class="col col-lg-2"></div>
    </div>
    <!-- row -->

    <div class="row">
      <div class="col col-12">

        <div class="list-group-item list-group-item-action" v-if="loading">
          <div class="spinner-border" role="status" >
          </div>
        </div>

        <div v-if="!loading && !projectData.length">
          <h4>No Project</h4>
        </div>

        <div class="accordion text-left" id="projectAccordion">
          <div class="card" v-for="(project, projectIndex) in projectData"
            :key="projectIndex">
            <div class="card-header">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse'+projectIndex" v-on:click="getProjectReadme(project.name)">
                  {{project.name}}
                </button>
              </h2>
            </div>

            <div :id="'collapse'+projectIndex" class="collapse" data-parent="#projectAccordion">
              <div class="card-body">
                <div v-if="readmeLoading">
                  <div class="spinner-border" role="status" >
                  </div>
                </div>
                <vue-simple-markdown :source="readme"></vue-simple-markdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col align-self-center">
        <div class="back-link">
          <router-link to="/">&larr; back to home</router-link>
        </div>
      </div >
    </div>
  </div>
  <!-- container -->
</template>

<script>
import { getUserProjects, getProjectReadme } from '../api/github'

export default {
  name: 'ProjectList',
  data () {
    return {
      projectData: [],
      loading: false,
      readme: "",
      readmeLoading: true
    }
  },
  mounted () {
    this.getProjects()
  },
  methods: {
    async getProjects () {
      try {
        this.loading = true
        const response = await getUserProjects(this.$route.params.user)
        this.projectData = response.data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async getProjectReadme (project) {
      try {
        this.readmeLoading = true
        const response = await getProjectReadme(this.$route.params.user, project)
        this.readme = response.data
        this.readmeLoading = false
      } catch (error) {
        this.readmeLoading = false
      }
    }
  }
}
</script>

<style scoped>
.accordion, .back-link {
  margin-top: 20px;
}
</style>
