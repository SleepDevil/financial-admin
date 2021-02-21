import axios from 'axios'

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://8.136.109.187:8000'
      : '/api',
  timeout: 5000
})

export default request