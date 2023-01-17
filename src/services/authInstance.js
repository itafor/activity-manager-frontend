import axios from 'axios'
import ExpirySession from '../utils/expirySession'

export const stagingbaseURL = 'https://aveo-agroshop-itafor.vercel.app/apis/v1'
export const testBaseURL = 'http://127.0.0.1:8000/api/v1'
export const liveBaseURL = 'https://schoolapi.ncktech.com/api/v1'

const instance = axios.create({
  // baseURL: stagingbaseURL,
  baseURL: liveBaseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

instance.interceptors.request.use(
  (config) => {
    const { access_token } = ExpirySession.get('user')

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default instance
