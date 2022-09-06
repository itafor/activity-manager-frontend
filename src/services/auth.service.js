import ExpirySession from '../utils/expirySession'
import ApiInstance from './apiInstance'
import AutInstance from './authInstance'

const signup = async (data) => {
  const response = await ApiInstance.post('/admin/signup', data)
  if (response.data) {
    ExpirySession.set('user', response.data)
  }
  return response.data
}

const login = async (data) => {
  const response = await ApiInstance.post('/admin/login', data)
  if (response?.data) {
    ExpirySession.set('user', response.data)
  }
  return response.data
}

const resetPassword = async (data) => {
  const response = await ApiInstance.post('admin/reset-password', data)
  return response.data
}

const sendOTP = async (data) => {
  const response = await ApiInstance.post('/admin/send/password/reset-token', data)
  return response.data
}

// Auth endpoints
const logout = () => {
  AutInstance.post(`admin/logout`)
  ExpirySession.clearAll()
}

const changePassword = async (data) => {
  const response = await AutInstance.post(`/admin/change/password`)
  return response.data
}

export const authService = {
  signup,
  login,
  resetPassword,
  sendOTP,

  logout,
  changePassword,
}
