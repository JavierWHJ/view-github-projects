import axios from 'axios'

export const __apiGet = (URL, param) => axios({
  url: URL,
  method: 'get',
  params: {
    q: param
  }

})

export const __apiGetCustomHeader = (URL) => axios({
  url: URL,
  method: 'get',
  headers: {'Accept': 'application/vnd.github.v3.raw+json'}
})
