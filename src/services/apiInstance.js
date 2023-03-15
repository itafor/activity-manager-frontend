import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://aveo-agroshop-itafor.vercel.app/apis/v1',
  baseURL: 'http://127.0.0.1:8000/api/v1',
  // baseURL: 'https://schoolapi.ncktech.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default instance
