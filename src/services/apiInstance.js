import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', //'https://xpro.getshopeasy.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default instance
