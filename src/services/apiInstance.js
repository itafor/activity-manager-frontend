import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://xpro.getshopeasy.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default instance
