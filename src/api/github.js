import { __apiGet, __apiGetCustomHeader } from '../utils/api'

export const searchUser = user => __apiGet('https://api.github.com/search/users?', user)

export const getUserProjects = user => __apiGetCustomHeader(`https://api.github.com/users/${user}/repos`)

export const getProjectReadme = (user, repo) => __apiGetCustomHeader(`https://api.github.com/repos/${user}/${repo}/readme`)