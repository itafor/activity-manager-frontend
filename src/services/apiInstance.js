import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://docs.shop4me.online/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default instance
